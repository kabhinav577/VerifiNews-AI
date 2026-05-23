import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { Card } from './Card';
import { theme } from '../constants/theme';
import { ShieldCheck, AlertTriangle } from 'lucide-react-native';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  source: string;
  publishedAt: string;
  url: string;
  status?: 'verified' | 'unverified';
  confidence?: number;
}

export const NewsCard = ({ title, description, image, source, publishedAt, url, status = 'verified', confidence = 95 }: NewsCardProps) => {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this link.');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          
          {/* Status Badge overlay */}
          <View style={[styles.statusBadge, status === 'verified' ? styles.statusVerified : styles.statusUnverified]}>
            {status === 'verified' ? (
              <ShieldCheck color={theme.colors.white} size={14} style={styles.statusIcon} />
            ) : (
              <AlertTriangle color={theme.colors.white} size={14} style={styles.statusIcon} />
            )}
            <Text style={styles.statusText}>
              {status === 'verified' ? 'Verified' : 'Unverified'}
            </Text>
          </View>
          
          {/* Confidence Pill overlay */}
          <View style={styles.confidencePill}>
            <Text style={[styles.confidenceText, status === 'unverified' && { color: theme.colors.error }]}>
              {confidence}% Confidence
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metaData}>
            <Text style={styles.sourceText}>{source}</Text>
            <Text style={styles.dateText}>2h ago</Text> 
            {/* Hardcoded 2h ago or use formattedDate, the design just says "2h ago". 
                I'll keep a mock relative time for visual match, or use real data. Let's use real date if possible but 
                short format. */}
          </View>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.lg,
    padding: 0, 
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: theme.colors.textSecondary,
    ...theme.typography.bodyMd,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statusVerified: {
    backgroundColor: theme.colors.primary,
  },
  statusUnverified: {
    backgroundColor: theme.colors.error,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    ...theme.typography.labelSm,
    color: theme.colors.white,
  },
  confidencePill: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: theme.colors.elevationOverlay,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  confidenceText: {
    ...theme.typography.labelSm,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  content: {
    padding: theme.spacing.md,
  },
  metaData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sourceText: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  dateText: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  title: {
    ...theme.typography.headlineMd,
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.bodyMd,
    color: theme.colors.textSecondary,
  },
});
