import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck, Bell } from 'lucide-react-native';
import { theme } from '../constants/theme';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <ShieldCheck color={theme.colors.primary} size={24} style={styles.logoIcon} />
        <Text style={styles.logoText}>VerifiNews AI</Text>
      </View>
      <View style={styles.rightContainer}>
        <Bell color={theme.colors.text} size={22} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.marginMobile,
    backgroundColor: theme.colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9', // light gray border
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 6,
  },
  logoText: {
    fontSize: 20,
    fontFamily: theme.typography.headlineMd.fontFamily,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
