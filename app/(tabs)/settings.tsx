// screens/Settings.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Button, useTheme } from 'react-native-paper';

const Settings = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>General</List.Subheader>
        <List.Item
          title="Notifications"
          left={() => <List.Icon icon="bell-outline" />}
          right={() => <Switch value={true} />}
        />
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="brightness-6" />}
          right={() => <Switch value={false} />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Edit Profile"
          left={() => <List.Icon icon="account-edit-outline" />}
          onPress={() => {}}
        />
        <List.Item
          title="Change Password"
          left={() => <List.Icon icon="lock-outline" />}
          onPress={() => {}}
        />
      </List.Section>

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          icon="logout"
          onPress={() => {}}
          style={styles.logoutButton}
          color={theme.colors.error}
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logoutContainer: {
    padding: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default Settings;