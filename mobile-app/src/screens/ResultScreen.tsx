import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../types/navigation';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react-native';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/useAuthStore';

type ResultScreenRouteProp = RouteProp<HomeStackParamList, 'Result'>;

export const ResultScreen = () => {
  const route = useRoute<ResultScreenRouteProp>();
  const navigation = useNavigation();
  const { prediction, confidence, originalText, isFromHistory, created_at, modelUsed } = route.params;
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Optionally save to Supabase analyses table
    const saveToHistory = async () => {
      if (isFromHistory) {
        setSaved(true);
        return;
      }
      if (user && originalText && !saved) {
        await supabase.from('analyses').insert({
          user_id: user.id,
          text: originalText,
          prediction,
          confidence,
          model_used: modelUsed || 'distilbert', // Dynamically save the used model
        });
        setSaved(true);
      }
    };
    saveToHistory();
  }, [user, originalText, prediction, confidence, saved, isFromHistory, modelUsed]);

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return '';
    const formattedString = dateString.replace(' ', 'T');
    const date = new Date(formattedString);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 0) return 'Just now';
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const isFake = prediction.toLowerCase().includes('fake');
  const score = (confidence * 100).toFixed(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={theme.colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis Result</Text>
      </View>
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {created_at && (
          <Text style={styles.subtitleDate}>
            Verified {formatRelativeTime(created_at)}
          </Text>
        )}
        
        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            {isFake ? (
              <AlertCircle color={theme.colors.error} size={64} />
            ) : (
              <CheckCircle color={theme.colors.success} size={64} />
            )}
          </View>
          
          <Text style={[styles.predictionText, { color: isFake ? theme.colors.error : theme.colors.success }]}>
            {prediction.toUpperCase()} NEWS
          </Text>
          
          <View style={[
            styles.scoreContainer, 
            isFake ? styles.scoreContainerFake : styles.scoreContainerReal
          ]}>
            <Text style={styles.scoreLabel}>Confidence Score:</Text>
            <Text style={[
              styles.scoreValue, 
              { color: isFake ? theme.colors.error : theme.colors.primary }
            ]}>{score}%</Text>
          </View>

          <View style={styles.divider} />

          {/* Analysis Metrics */}
          <Text style={styles.sectionTitle}>Analysis Metrics</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Bias</Text>
              <Text 
                style={[styles.metricValue, { color: isFake ? '#ea580c' : '#16a34a' }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {isFake ? 'High' : 'Low'}
              </Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Sentiment</Text>
              <Text 
                style={[styles.metricValue, { color: isFake ? '#dc2626' : '#2563eb' }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {isFake ? 'Negative' : 'Neutral'}
              </Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Model</Text>
              <Text 
                style={[styles.metricValue, { color: theme.colors.primary }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {((modelUsed || 'distilbert') as string).toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Original Analyzed Text */}
          {originalText && (
            <>
              <Text style={styles.sectionTitle}>Analyzed Text</Text>
              <View style={styles.originalTextContainer}>
                <ScrollView style={styles.originalTextScroll} nestedScrollEnabled={true}>
                  <Text style={styles.originalText}>{originalText}</Text>
                </ScrollView>
              </View>
              <View style={styles.divider} />
            </>
          )}
          
          <Text style={styles.explanationTitle}>Explanation</Text>
          <Text style={styles.explanationText}>
            Based on the linguistic patterns and context analyzed by our AI model, this article exhibits characteristics commonly found in {prediction.toLowerCase()} news.
          </Text>

          <Button 
            title={isFromHistory ? "Go Back" : "Verify Another Article"} 
            onPress={() => navigation.goBack()} 
            style={styles.button}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.cardBackground,
  },
  backButton: {
    marginRight: theme.spacing.sm,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  subtitleDate: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    marginTop: 4,
  },
  card: {
    padding: theme.spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  predictionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
  },
  scoreContainerReal: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
  },
  scoreContainerFake: {
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
  },
  scoreLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.cardBorder,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  explanationText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
  },
  button: {
    width: '100%',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  metricBox: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 4,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    ...theme.typography.labelSm,
    fontSize: 10,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    ...theme.typography.labelLg,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  originalTextContainer: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    maxHeight: 180,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  originalTextScroll: {
    maxHeight: 160,
  },
  originalText: {
    ...theme.typography.bodyMd,
    color: theme.colors.text,
    lineHeight: 20,
  },
});
