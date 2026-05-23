import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, LayoutAnimation, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, Trash2 } from 'lucide-react-native';

interface HistoryItem {
  id: string;
  text: string;
  prediction: string;
  confidence: number;
  created_at: string;
  model_used: string;
}

export const HistoryScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
          .from('analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setHistory(data);
        }
        setLoading(false);
      };

      fetchHistory();
    }, [user])
  );

  const toggleExpand = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const handleDelete = useCallback((id: string) => {
    Alert.alert(
      'Delete History Item',
      'Are you sure you want to delete this news credibility check from your history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('analyses')
                .delete()
                .eq('id', id);

              if (error) {
                console.warn('Failed to delete history item:', error.message);
                Alert.alert('Error', 'Failed to delete record.');
              } else {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHistory(prev => prev.filter(item => item.id !== id));
                setExpandedId(prev => prev === id ? null : prev);
              }
            } catch (err) {
              console.warn('Error deleting history item:', err);
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          }
        }
      ]
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: HistoryItem }) => {
    const isFake = item.prediction.toLowerCase().includes('fake');
    const score = (item.confidence * 100).toFixed(1);
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => toggleExpand(item.id)}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              {isFake ? (
                <AlertCircle color={theme.colors.error} size={24} />
              ) : (
                <CheckCircle color={theme.colors.success} size={24} />
              )}
              <Text style={[styles.predictionText, { color: isFake ? theme.colors.error : theme.colors.success }]}>
                {item.prediction.toUpperCase()}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
              <TouchableOpacity 
                style={{ padding: 4, marginLeft: 8 }}
                onPress={() => handleDelete(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 color="#ba1a1a" size={16} />
              </TouchableOpacity>
              {isExpanded ? (
                <ChevronUp color={theme.colors.textSecondary} size={20} style={{ marginLeft: 8 }} />
              ) : (
                <ChevronDown color={theme.colors.textSecondary} size={20} style={{ marginLeft: 8 }} />
              )}
            </View>
          </View>
          <Text style={styles.scoreText}>Confidence: {score}%</Text>
          <Text style={styles.articleText} numberOfLines={isExpanded ? undefined : 3}>
            {item.text}
          </Text>

          {isExpanded && (
            <View style={styles.detailsContainer}>
              <View style={styles.divider} />
              
              <View style={styles.metricsRow}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Bias</Text>
                  <Text style={[styles.metricValue, { color: isFake ? '#ea580c' : '#16a34a' }]}>
                    {isFake ? 'High' : 'Low'}
                  </Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Sentiment</Text>
                  <Text style={[styles.metricValue, { color: isFake ? '#dc2626' : '#2563eb' }]}>
                    {isFake ? 'Negative' : 'Neutral'}
                  </Text>
                </View>
              </View>

              <Text style={styles.modelText}>
                Analyzed with: {item.model_used ? item.model_used.toUpperCase() : 'DISTILBERT'}
              </Text>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    );
  }, [expandedId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={theme.colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>History</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
        ) : history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No verifications yet.</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  backButton: {
    marginRight: theme.spacing.sm,
    padding: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: theme.spacing.xs,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  scoreText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  articleText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  detailsContainer: {
    marginTop: theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: theme.spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  metricBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modelText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
