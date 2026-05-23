import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Link, BrainCircuit, ShieldCheck } from 'lucide-react-native';

export const SearchScreen = () => {
  const [url, setUrl] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Verify Truth</Text>
          <Text style={styles.subtitle}>
            Instant credibility analysis powered by decentralized fact-checking AI.
          </Text>
        </View>

        {/* Input Section */}
        <Card style={styles.inputCard}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Paste Article URL</Text>
            <TextInput
              style={styles.textArea}
              placeholder="https://news-source.com/article-to-check..."
              placeholderTextColor={theme.colors.textSecondary}
              value={url}
              onChangeText={setUrl}
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              autoCorrect={false}
              textAlignVertical="top"
            />
          </View>
          <Button 
            title="Check Credibility" 
            onPress={() => {}}
            style={styles.checkButton}
            icon={<Search color={theme.colors.white} size={20} />}
          />
        </Card>

        {/* How it Works Section */}
        <View style={styles.howItWorksHeader}>
          <Text style={styles.howItWorksTitle}>How it Works</Text>
        </View>

        <Card style={styles.stepCard}>
          <View style={styles.stepIconWrapperBlue}>
            <Link color={theme.colors.primary} size={20} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Link Analysis</Text>
            <Text style={styles.stepDesc}>
              We cross-reference source history and domain reputation across 50+ trust databases.
            </Text>
          </View>
        </Card>

        <Card style={styles.stepCard}>
          <View style={styles.stepIconWrapperBlue}>
            <BrainCircuit color={theme.colors.primary} size={20} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>AI Processing</Text>
            <Text style={styles.stepDesc}>
              Neural networks analyze semantic bias, logical fallacies, and structural manipulation.
            </Text>
          </View>
        </Card>

        <Card style={styles.stepCard}>
          <View style={styles.stepIconWrapperBlue}>
            <ShieldCheck color={theme.colors.primary} size={20} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Trust Score</Text>
            <Text style={styles.stepDesc}>
              Receive a weighted credibility score from 0-100 with detailed source verification.
            </Text>
          </View>
        </Card>

        {/* Bottom Banner */}
        <View style={styles.bannerContainer}>
          <Text style={styles.bannerTextAbove}>Trusted by 2M+ users for daily news verification.</Text>
          <Image 
            source={require('../../assets/mobile-connected.png')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

      </ScrollView>
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
  content: {
    padding: theme.spacing.marginMobile,
    paddingBottom: 40,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  inputCard: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.outline, // outline color
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    position: 'relative',
    height: 120,
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: theme.colors.cardBackground,
    paddingHorizontal: 4,
    ...theme.typography.labelMd,
    color: theme.colors.primary,
  },
  textArea: {
    flex: 1,
    ...theme.typography.bodyMd,
    color: theme.colors.text,
    paddingTop: theme.spacing.sm,
  },
  checkButton: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  howItWorksHeader: {
    marginBottom: theme.spacing.md,
  },
  howItWorksTitle: {
    ...theme.typography.headlineMd,
    color: theme.colors.text,
  },
  stepCard: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceContainerLow, // slightly different background? The screenshot shows it's light grey `#f2f4f6`
    borderWidth: 0, // no border in screenshot? Or very subtle. We'll use surfaceContainerLow
  },
  stepIconWrapperBlue: {
    backgroundColor: '#eef2ff',
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...theme.typography.labelLg,
    color: theme.colors.text,
    marginBottom: 4,
  },
  stepDesc: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
  },
  bannerContainer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  bannerTextAbove: {
    ...theme.typography.bodyLg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontWeight: '600',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: theme.borderRadius.md,
  },
});
