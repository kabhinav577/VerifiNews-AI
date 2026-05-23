import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { HomeStackParamList } from '../types/navigation';
import { predictNews, predictNewsUrl } from '../services/api';
import { 
  Scan, 
  Zap, 
  FolderOpen, 
  TrendingUp, 
  AlertCircle, 
  BarChart2, 
  ChevronRight 
} from 'lucide-react-native';

type InputScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'InputArticle'>;
type InputScreenRouteProp = RouteProp<HomeStackParamList, 'InputArticle'>;

export const InputScreen = () => {
  const navigation = useNavigation<InputScreenNavigationProp>();
  const route = useRoute<InputScreenRouteProp>();
  
  const [articleText, setArticleText] = useState(route.params?.initialUrl || '');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'distilbert' | 'mobilebert' | 'tfidf_gb'>('distilbert');

  React.useEffect(() => {
    if (route.params?.initialUrl !== undefined) {
      setArticleText(route.params.initialUrl);
    }
  }, [route.params?.initialUrl]);

  const handleVerify = async () => {
    if (!articleText.trim()) {
      Alert.alert('Empty Input', 'Please enter a URL or news text first.');
      return;
    }

    setLoading(true);
    try {
      const isUrl = articleText.startsWith('http://') || articleText.startsWith('https://');
      let result;
      
      if (isUrl) {
        result = await predictNewsUrl(articleText, selectedModel);
      } else {
        result = await predictNews(articleText, selectedModel);
      }

      if (result.error) {
        Alert.alert('Analysis Failed', result.error);
        return;
      }
      
      navigation.navigate('Result', {
        prediction: result.prediction === 'Real News' ? 'REAL' : 'FAKE',
        confidence: result.confidence,
        originalText: articleText,
        modelUsed: selectedModel,
      });
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Text style={styles.title}>The Guardian of Truth</Text>
          <Text style={styles.subtitle}>
            Analyze news articles for bias, factual accuracy, and source credibility in seconds.
          </Text>
        </View>

        {/* Dotted Upload Card */}
        <View style={styles.dottedCard}>
          {/* Scanner Icon */}
          <View style={styles.scannerIconWrapper}>
            <Scan color={theme.colors.white} size={24} />
          </View>
          
          <Text style={styles.cardTitle}>Drop Link or Image</Text>
          <Text style={styles.cardSubtitle}>
            Paste a URL or upload a screenshot to begin the AI deep-scan.
          </Text>

          {/* Model Selection Pill Bar */}
          <Text style={styles.selectorLabel}>SELECT CLASSIFIER MODEL</Text>
          <View style={styles.modelSelectorRow}>
            <TouchableOpacity 
              style={[styles.modelPill, selectedModel === 'distilbert' && styles.modelPillActive]}
              onPress={() => setSelectedModel('distilbert')}
            >
              <Text style={[styles.modelPillText, selectedModel === 'distilbert' && styles.modelPillTextActive]}>
                DistilBERT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modelPill, selectedModel === 'mobilebert' && styles.modelPillActive]}
              onPress={() => setSelectedModel('mobilebert')}
            >
              <Text style={[styles.modelPillText, selectedModel === 'mobilebert' && styles.modelPillTextActive]}>
                MobileBERT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modelPill, selectedModel === 'tfidf_gb' && styles.modelPillActive]}
              onPress={() => setSelectedModel('tfidf_gb')}
            >
              <Text style={[styles.modelPillText, selectedModel === 'tfidf_gb' && styles.modelPillTextActive]}>
                TF-IDF + GB
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="https://news-site.com/article"
              placeholderTextColor={theme.colors.textSecondary}
              value={articleText}
              onChangeText={setArticleText}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Buttons Row */}
          <View style={styles.buttonsRow}>
            <View style={{ flex: 1 }}>
              <Button 
                title="Analyze Now" 
                onPress={handleVerify} 
                isLoading={loading}
                style={styles.verifyBtn}
                icon={<Zap color={theme.colors.white} size={16} fill={theme.colors.white} />}
              />
            </View>
            <TouchableOpacity style={styles.folderBtn}>
              <FolderOpen color="#64748b" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Stat 1 */}
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>FACTS DETECTED</Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>8.4k</Text>
              <TrendingUp color={theme.colors.primary} size={18} style={styles.statIcon} />
            </View>
          </Card>

          {/* Stat 2 */}
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>BIAS CAUGHT</Text>
            <View style={styles.statValueRow}>
              <Text style={[styles.statValue, { color: '#ba1a1a' }]}>12%</Text>
              <AlertCircle color="#ba1a1a" size={18} style={styles.statIcon} />
            </View>
          </Card>
        </View>

        {/* Recent Scans Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Scans Card List */}
        <Card style={styles.scansCard}>
          {/* Item 1 */}
          <View style={styles.scanRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop' }} 
              style={styles.scanThumb} 
            />
            <View style={styles.scanInfo}>
              <Text style={styles.scanTitle} numberOfLines={1}>Election 2024: Economic Sh...</Text>
              <Text style={styles.scanMeta}>2 mins ago • nytimes.com</Text>
            </View>
            <BarChart2 color={theme.colors.primary} size={22} />
          </View>

          <View style={styles.divider} />

          {/* Item 2 */}
          <View style={styles.scanRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=150&auto=format&fit=crop' }} 
              style={styles.scanThumb} 
            />
            <View style={styles.scanInfo}>
              <Text style={styles.scanTitle} numberOfLines={1}>Global Climate Accord Real...</Text>
              <Text style={styles.scanMeta}>1 hour ago • reuters.com</Text>
            </View>
            <BarChart2 color={theme.colors.primary} size={22} />
          </View>
        </Card>

        {/* Weekly Trust Insight Banner */}
        <View style={styles.insightBanner}>
          <Text style={styles.insightTitle}>Weekly Trust Insight</Text>
          <Text style={styles.insightDesc}>
            Your scanned sources show a 14% increase in factual density this week compared to last month.
          </Text>
          
          <View style={styles.insightFooter}>
            {/* Overlapping Avatars */}
            <View style={styles.avatarOverlap}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=60&auto=format&fit=crop' }} 
                style={styles.overlapImg} 
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&auto=format&fit=crop' }} 
                style={[styles.overlapImg, { marginLeft: -8 }]} 
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=60&auto=format&fit=crop' }} 
                style={[styles.overlapImg, { marginLeft: -8 }]} 
              />
              <View style={styles.overlapMore}>
                <Text style={styles.overlapMoreText}>AI</Text>
              </View>
            </View>
            <Text style={styles.insightFooterText}>Trusted by 2.4k Verifiers</Text>
          </View>
        </View>

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
  heroContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  dottedCard: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.lg,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 24,
  },
  scannerIconWrapper: {
    backgroundColor: theme.colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    lineHeight: 16,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: theme.borderRadius.md,
    height: 44,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 12,
  },
  input: {
    fontSize: 13,
    color: '#475569',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  verifyBtn: {
    height: 44,
  },
  folderBtn: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statIcon: {
    marginLeft: 8,
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
  scansCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scanThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  scanInfo: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  scanMeta: {
    fontSize: 10,
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  insightBanner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  insightDesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
    marginBottom: 16,
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOverlap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlapImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  overlapMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  overlapMoreText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '700',
  },
  insightFooterText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectorLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
    marginTop: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  modelSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  modelPill: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelPillActive: {
    borderColor: theme.colors.primary,
    backgroundColor: '#eff6ff',
  },
  modelPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
  },
  modelPillTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
