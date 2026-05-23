import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { HomeStackParamList } from '../types/navigation';
import { 
  ShieldCheck, 
  Link, 
  Scale, 
  Globe, 
  Zap, 
  Sparkles 
} from 'lucide-react-native';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [url, setUrl] = useState('');

  const handleAnalyze = () => {
    navigation.navigate('InputArticle', { initialUrl: url });
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
          {/* Header Badge */}
          <View style={styles.badge}>
            <Sparkles color="#6366f1" size={13} style={styles.badgeIcon} />
            <Text style={styles.badgeText}>Next-Gen Fact Checking</Text>
          </View>
          
          <Text style={styles.title}>
            Verify the world's{'\n'}<Text style={styles.titleHighlight}>information</Text>
          </Text>
          <Text style={styles.subtitle}>
            Instant AI-powered validation for news articles, social threads, and digital claims.
          </Text>
        </View>

        {/* Input Form Card */}
        <Card style={styles.inputCard}>
          <View style={styles.inputContainer}>
            <Link color={theme.colors.textSecondary} size={18} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Paste article URL or claim..."
              placeholderTextColor={theme.colors.textSecondary}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Button 
            title="AI Scan Now" 
            onPress={handleAnalyze}
            style={styles.analyzeButton}
            icon={<Zap color={theme.colors.white} size={16} fill={theme.colors.white} />}
          />
        </Card>

        {/* Verification Engine Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verification Engine</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Live Status</Text>
          </TouchableOpacity>
        </View>

        {/* Deep Link Analysis Card */}
        <Card style={styles.mainCard}>
          <View style={styles.mainCardLeft}>
            <View style={styles.iconWrapperBlue}>
              <Globe color={theme.colors.primary} size={20} />
            </View>
            <Text style={styles.cardTitle}>Deep Link Analysis</Text>
            <Text style={styles.cardDescription}>
              Trace source origins across 40k+ verified databases.
            </Text>
          </View>
          {/* Globe Wireframe Mock Graphic on Right */}
          <View style={styles.globeGraphicWrapper}>
            <View style={styles.globeCircleOuter}>
              <View style={styles.globeCircleInner} />
            </View>
          </View>
        </Card>

        {/* Two smaller cards row */}
        <View style={styles.rowCards}>
          {/* Bias Detection Card */}
          <Card style={[styles.smallCard, { marginRight: theme.spacing.sm }]}>
            <View style={styles.iconWrapperLightBlue}>
              <Scale color={theme.colors.primary} size={18} />
            </View>
            <Text style={styles.cardTitleSmall}>Bias Detection</Text>
            <Text style={styles.cardDescriptionSmall}>
              Language sentiment & slant analysis.
            </Text>
          </Card>
          
          {/* Source Reliability Card */}
          <Card style={[styles.smallCard, { marginLeft: theme.spacing.sm }]}>
            <View style={styles.iconWrapperLightBlue}>
              <ShieldCheck color={theme.colors.primary} size={18} />
            </View>
            <Text style={styles.cardTitleSmall}>Source Reliability</Text>
            <Text style={styles.cardDescriptionSmall}>
              Historical credibility scoring.
            </Text>
          </Card>
        </View>

        {/* Verification Pulse Section */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Verification Pulse</Text>
        </View>

        {/* Pulse Item 1 */}
        <Card style={styles.pulseCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop' }} 
            style={styles.pulseThumb} 
          />
          <View style={styles.pulseContent}>
            <View style={styles.pulseMeta}>
              <Text style={styles.pulseCategoryPolitics}>POLITICS</Text>
              <Text style={styles.pulseTime}>2m ago</Text>
            </View>
            <Text style={styles.pulseTitle}>Economic policy shifts in EU...</Text>
            <View style={styles.pulseProgressContainer}>
              <View style={styles.progressBarWrapper}>
                <View style={[styles.progressBarFill, { width: '94%', backgroundColor: theme.colors.primary }]} />
              </View>
              <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>94%</Text>
            </View>
          </View>
        </Card>

        {/* Pulse Item 2 */}
        <Card style={styles.pulseCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=150&auto=format&fit=crop' }} 
            style={styles.pulseThumb} 
          />
          <View style={styles.pulseContent}>
            <View style={styles.pulseMeta}>
              <Text style={styles.pulseCategoryHealth}>HEALTH</Text>
              <Text style={styles.pulseTime}>15m ago</Text>
            </View>
            <Text style={styles.pulseTitle}>New miracle cure viral thread...</Text>
            <View style={styles.pulseProgressContainer}>
              <View style={styles.progressBarWrapper}>
                <View style={[styles.progressBarFill, { width: '12%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={[styles.progressPercent, { color: '#ef4444' }]}>12%</Text>
            </View>
          </View>
        </Card>

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
    marginBottom: 20,
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    marginBottom: 16,
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6366f1',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  titleHighlight: {
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  inputCard: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: theme.borderRadius.md,
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    height: '100%',
  },
  analyzeButton: {
    height: 44,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  mainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  mainCardLeft: {
    flex: 1.3,
  },
  iconWrapperBlue: {
    backgroundColor: '#eff6ff',
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  globeGraphicWrapper: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -20,
    opacity: 0.15,
  },
  globeCircleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  globeCircleInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    padding: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconWrapperLightBlue: {
    backgroundColor: '#eff6ff',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitleSmall: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardDescriptionSmall: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 14,
  },
  pulseCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    alignItems: 'center',
  },
  pulseThumb: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  pulseContent: {
    flex: 1,
  },
  pulseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  pulseCategoryPolitics: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  pulseCategoryHealth: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ef4444',
    letterSpacing: 0.5,
  },
  pulseTime: {
    fontSize: 9,
    color: '#94a3b8',
  },
  pulseTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  pulseProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarWrapper: {
    flex: 1,
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressPercent: {
    fontSize: 10,
    fontWeight: '700',
  },
});
