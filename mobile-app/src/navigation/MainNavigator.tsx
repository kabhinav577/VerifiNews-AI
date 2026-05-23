import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { HomeNavigator } from './HomeNavigator';
import { FeedScreen } from '../screens/FeedScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileNavigator } from './ProfileNavigator';
import { Home, Search, User, Rss } from 'lucide-react-native';
import { theme } from '../constants/theme';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.cardBackground,
          borderTopColor: theme.colors.cardBorder,
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 88 : 68,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: theme.typography.labelMd.fontFamily,
          fontSize: theme.typography.labelMd.fontSize,
          letterSpacing: theme.typography.labelMd.letterSpacing,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => <Rss color={color} size={24} />,
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => <Search color={color} size={24} />,
        }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileNavigator} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};
