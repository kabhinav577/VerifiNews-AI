import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const Button = ({ title, onPress, isLoading, style, textStyle, variant = 'primary', icon }: ButtonProps) => {
  
  const getBackgroundColor = () => {
    switch(variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return 'transparent';
      case 'danger': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  const getBorderColor = () => {
    if (variant === 'secondary') return theme.colors.cardBorder;
    return 'transparent';
  };


  const getTextColor = () => {
    switch(variant) {
      case 'primary': return theme.colors.white;
      case 'secondary': return theme.colors.text;
      case 'danger': return theme.colors.white;
      default: return theme.colors.white;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: getBorderColor(),
        },
        style
      ]} 
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...theme.typography.labelLg,
  },
});
