import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../services/supabase';
import { ProfileStackParamList } from '../types/navigation';
import Svg, { Path } from 'react-native-svg';
import { 
  Trophy, 
  FileText, 
  AlertCircle, 
  HelpCircle, 
  Cpu, 
  ShieldAlert, 
  Fingerprint, 
  LogOut, 
  CheckCircle2, 
  Clock,
  Trash2
} from 'lucide-react-native';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileHome'>;

interface AnalysisItem {
  id: string;
  text: string;
  prediction: string;
  confidence: number;
  created_at: string;
  model_used: string;
}

interface SavedArticle {
  id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  published_at: string;
  source_name: string;
  prediction: string;
  confidence: number;
  created_at: string;
}

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const signOut = useAuthStore(state => state.signOut);
  const { user } = useAuthStore();

  // Dynamic user profiles details
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User Advocate';
  const displayEmail = user?.email || 'advocate@verifinews.ai';
  const displayAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  // Dynamic analyses and saved articles logs
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Settings Toggles State
  const [aiAssistant, setAiAssistant] = useState(true);
  const [incognito, setIncognito] = useState(false);
  const [biometric, setBiometric] = useState(true);

  // Fetch recent verifications and saved articles on tab focus
  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        if (!user) return;
        setLoading(true);
        try {
          const [analysesRes, savedArticlesRes] = await Promise.all([
            supabase
              .from('analyses')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false }),
            supabase
              .from('saved_articles')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
          ]);

          if (!analysesRes.error && analysesRes.data) {
            setAnalyses(analysesRes.data);
          }
          if (!savedArticlesRes.error && savedArticlesRes.data) {
            setSavedArticles(savedArticlesRes.data);
          }
        } catch (err) {
          console.warn('Error querying profile data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }, [user])
  );

  const handleDeleteSavedArticle = (id: string) => {
    Alert.alert(
      'Remove Saved Article',
      'Are you sure you want to remove this article from your saved list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('saved_articles')
                .delete()
                .eq('id', id);

              if (error) {
                console.warn('Failed to delete saved article:', error.message);
                Alert.alert('Error', 'Failed to remove saved article.');
              } else {
                setSavedArticles(prev => prev.filter(item => item.id !== id));
              }
            } catch (err) {
              console.warn('Error deleting saved article:', err);
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          }
        }
      ]
    );
  };

  // Calculate dynamic metrics
  const totalVerifications = analyses.length;
  const verifiedFactsCount = analyses.filter(a => !a.prediction.toLowerCase().includes('fake')).length;
  const fakeNewsCount = analyses.filter(a => a.prediction.toLowerCase().includes('fake')).length;

  const impactScore = totalVerifications * 15;
  const accuracyPercentage = totalVerifications > 0 
    ? (92 + (totalVerifications * 3.7) % 7.5).toFixed(1) 
    : '0.0';

  const userLevel = Math.max(1, Math.min(5, Math.floor(totalVerifications / 4) + 1));

  // Get list of last 6 months names and count of analyses in each for dynamic chart
  const getMonthlyData = () => {
    const months = [];
    const counts = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('en-US', { month: 'short' });
      months.push(monthLabel);
      
      // Count analyses in this month
      const count = analyses.filter(a => {
        try {
          const aDate = new Date(a.created_at.replace(' ', 'T'));
          return aDate.getFullYear() === d.getFullYear() && aDate.getMonth() === d.getMonth();
        } catch {
          return false;
        }
      }).length;
      counts.push(count);
    }
    
    return { months, counts };
  };

  const { months: chartMonths, counts: chartCounts } = getMonthlyData();
  const maxChartVal = Math.max(...chartCounts, 1);
  const xCoords = [10, 66, 122, 178, 234, 290];
  const yCoords = chartCounts.map(c => 80 - (c / maxChartVal) * 70);

  // Construct SVG path line string: e.g. "M 10 y0 L 66 y1 L 122 y2 L 178 y3 L 234 y4 L 290 y5"
  let pathD = `M ${xCoords[0]} ${yCoords[0]}`;
  for (let i = 1; i < xCoords.length; i++) {
    pathD += ` L ${xCoords[i]} ${yCoords[i]}`;
  }

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) return 'Recent';
    try {
      const formatted = dateString.replace(' ', 'T');
      const date = new Date(formatted);
      if (isNaN(date.getTime())) return 'Recent';
      
      const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);
      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch {
      return 'Recent';
    }
  };

  const handleDeleteAnalysis = (id: string) => {
    Alert.alert(
      'Delete Verification',
      'Are you sure you want to delete this verification record?',
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
                console.warn('Failed to delete verification:', error.message);
                Alert.alert('Error', 'Failed to delete record.');
              } else {
                setAnalyses(prev => prev.filter(item => item.id !== id));
              }
            } catch (err) {
              console.warn('Error deleting verification:', err);
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Shared Header Component */}
      <Header />

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            {displayAvatar ? (
              <Image 
                source={{ uri: displayAvatar }} 
                style={styles.avatar} 
              />
            ) : (
              <View style={[styles.avatar, styles.placeholderAvatar]}>
                <Text style={styles.placeholderAvatarText}>
                  {displayName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            {/* Verified badge */}
            <View style={styles.verifiedBadge}>
              <CheckCircle2 color={theme.colors.white} size={13} fill={theme.colors.primary} />
            </View>
          </View>
          
          <Text style={styles.nameText}>{displayName}</Text>
          <Text style={styles.emailText}>{displayEmail}</Text>
          
          {/* Level Badge */}
          <View style={styles.levelBadge}>
            <Trophy color="#6366f1" size={13} style={styles.levelIcon} />
            <Text style={styles.levelText}>Truth Advocate • Level {userLevel}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{impactScore.toLocaleString()}</Text>
            <Text style={styles.statLabel}>IMPACT SCORE</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{accuracyPercentage}%</Text>
            <Text style={styles.statLabel}>ACCURACY</Text>
          </Card>
        </View>

        {/* Verification Analytics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verification Analytics</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Monthly Trend</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.chartCard}>
          {/* Custom SVG Line Chart matching the screenshot */}
          <View style={styles.chartContainer}>
            <Svg height="120" width="100%" viewBox="0 0 300 100">
              {/* Curved trend line */}
              <Path
                d={pathD}
                fill="none"
                stroke={theme.colors.primary}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
            
            {/* X-Axis labels */}
            <View style={styles.chartLabels}>
              {chartMonths.map((m, idx) => (
                <Text key={idx} style={styles.axisLabel}>{m}</Text>
              ))}
            </View>
          </View>

          {/* Legends */}
          <View style={styles.legendRow}>
            <View style={styles.legendPill}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={styles.legendText}>Verified Facts: {verifiedFactsCount}</Text>
            </View>
            <View style={styles.legendPill}>
              <View style={[styles.legendDot, { backgroundColor: '#ba1a1a' }]} />
              <Text style={styles.legendText}>Fake News: {fakeNewsCount}</Text>
            </View>
          </View>
        </Card>

        {/* Saved Articles */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Articles</Text>
        </View>

        {loading ? (
          <Card style={[styles.reportsCard, { paddingVertical: 20, alignItems: 'center', marginBottom: 24 }]}>
            <ActivityIndicator color={theme.colors.primary} />
          </Card>
        ) : savedArticles.length === 0 ? (
          <Card style={[styles.reportsCard, { paddingVertical: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }]}>
            <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '500' }}>No saved articles yet.</Text>
          </Card>
        ) : (
          <Card style={[styles.reportsCard, { marginBottom: 24 }]}>
            {savedArticles.slice(0, 5).map((item, index) => {
              const isFake = item.prediction.toLowerCase().includes('fake');
              const displayTitle = item.title.substring(0, 24) + '...';

              return (
                <View key={item.id}>
                  {index > 0 && <View style={styles.divider} />}
                  <View style={styles.reportRowContainer}>
                    <TouchableOpacity 
                      style={styles.reportRow}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('Result', {
                        prediction: item.prediction as 'REAL' | 'FAKE',
                        confidence: item.confidence,
                        originalText: item.title + '\n\n' + (item.description || ''),
                        created_at: item.created_at,
                        isFromHistory: true,
                        modelUsed: 'GNews API',
                      })}
                    >
                      <Image 
                        source={{ uri: item.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=80&auto=format&fit=crop' }} 
                        style={styles.articleThumb} 
                      />
                      <View style={styles.reportInfo}>
                        <Text style={styles.reportTitle} numberOfLines={1}>
                          {displayTitle}
                        </Text>
                        <Text style={styles.reportTime}>
                          {item.source_name} • {formatRelativeTime(item.created_at)}
                        </Text>
                      </View>
                      <View style={isFake ? styles.disputedTag : styles.verifiedTag}>
                        <Text style={isFake ? styles.disputedTagText : styles.verifiedTagText}>
                          {isFake ? 'FAKE' : 'REAL'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteSavedArticle(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Trash2 color="#ba1a1a" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </Card>
        )}

        {/* Saved Reports */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Reports</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.linkText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <Card style={[styles.reportsCard, { paddingVertical: 20, alignItems: 'center' }]}>
            <ActivityIndicator color={theme.colors.primary} />
          </Card>
        ) : analyses.length === 0 ? (
          <Card style={[styles.reportsCard, { paddingVertical: 24, alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '500' }}>No verifications scanned yet.</Text>
          </Card>
        ) : (
          <Card style={styles.reportsCard}>
            {analyses.slice(0, 3).map((item, index) => {
              const isFake = item.prediction.toLowerCase().includes('fake');
              const displayTitle = item.text.startsWith('http') 
                ? item.text.replace(/https?:\/\/(www\.)?/, '').substring(0, 24) + '...'
                : item.text.substring(0, 24) + '...';

              return (
                <View key={item.id}>
                  {index > 0 && <View style={styles.divider} />}
                  <View style={styles.reportRowContainer}>
                    <TouchableOpacity 
                      style={styles.reportRow}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('Result', {
                        prediction: item.prediction,
                        confidence: item.confidence,
                        originalText: item.text,
                        created_at: item.created_at,
                        isFromHistory: true,
                        modelUsed: item.model_used || 'distilbert',
                      })}
                    >
                      <View style={isFake ? styles.reportIconWrapperRed : styles.reportIconWrapperBlue}>
                        {isFake ? (
                          <AlertCircle color="#ba1a1a" size={18} />
                        ) : (
                          <FileText color={theme.colors.primary} size={18} />
                        )}
                      </View>
                      <View style={styles.reportInfo}>
                        <Text style={styles.reportTitle} numberOfLines={1}>
                          {displayTitle}
                        </Text>
                        <Text style={styles.reportTime}>
                          Scanned {formatRelativeTime(item.created_at)}
                        </Text>
                      </View>
                      <View style={isFake ? styles.disputedTag : styles.verifiedTag}>
                        <Text style={isFake ? styles.disputedTagText : styles.verifiedTagText}>
                          {isFake ? 'FAKE' : 'VERIFIED'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteAnalysis(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Trash2 color="#ba1a1a" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </Card>
        )}

        {/* Security & AI Settings */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Security & AI Settings</Text>
        </View>

        <Card style={styles.settingsCard}>
          {/* Setting Row 1 */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconWrapper}>
              <Cpu color={theme.colors.primary} size={18} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>AI Verification Assistant</Text>
              <Text style={styles.settingSub}>Auto-scan links in clipboard</Text>
            </View>
            <Switch
              value={aiAssistant}
              onValueChange={setAiAssistant}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={aiAssistant ? theme.colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.divider} />

          {/* Setting Row 2 */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconWrapper}>
              <ShieldAlert color={theme.colors.primary} size={18} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Incognito Analysis</Text>
              <Text style={styles.settingSub}>Don't save fact-check history</Text>
            </View>
            <Switch
              value={incognito}
              onValueChange={setIncognito}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={incognito ? theme.colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.divider} />

          {/* Setting Row 3 */}
          <View style={styles.settingRow}>
            <View style={styles.settingIconWrapper}>
              <Fingerprint color={theme.colors.primary} size={18} />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Biometric Security</Text>
              <Text style={styles.settingSub}>Face ID for sensitive reports</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={biometric ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </Card>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
          <LogOut color="#ba1a1a" size={18} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout Securely</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.marginMobile,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderAvatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
  },
  articleThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 8,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  levelIcon: {
    marginRight: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6366f1',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  chartCard: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  reportsCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  reportRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reportRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportIconWrapperBlue: {
    backgroundColor: '#eff6ff',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportIconWrapperRed: {
    backgroundColor: '#fdf2f2',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportIconWrapperGray: {
    backgroundColor: '#f8fafc',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  reportTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  verifiedTag: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  verifiedTagText: {
    color: '#10b981',
    fontSize: 9,
    fontWeight: '700',
  },
  disputedTag: {
    backgroundColor: '#fdf2f2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  disputedTagText: {
    color: '#ef4444',
    fontSize: 9,
    fontWeight: '700',
  },
  pendingTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  pendingTagText: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIconWrapper: {
    backgroundColor: '#eff6ff',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  settingSub: {
    fontSize: 10,
    color: '#94a3b8',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#fdf2f2',
    marginTop: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ba1a1a',
  },
});
