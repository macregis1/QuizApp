// import { Notifications } from 'expo-notifications';

// // Function to request permission for notifications
// export const registerForPushNotificationsAsync = async (title, body) => {
//   try {
//     // Request permission for notifications if needed
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
    
//     // If permission is granted, schedule the notification
//     if (finalStatus === 'granted') {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: title,
//           body: body,
//         },
//         trigger: null, // Show immediately
//       });
//     } else {
//       console.log('Permission for notifications not granted');
//     }
//   } catch (error) {
//     console.error('Error displaying notification:', error);
//   }
// };
