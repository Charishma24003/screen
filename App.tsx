
import * as Notifications from 'expo-notifications';
import RootStack from './navigation/RootStack';

// 🔔 GLOBAL HANDLER (must be outside component)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    return <RootStack />;
}
