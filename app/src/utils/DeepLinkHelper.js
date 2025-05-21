export const linking = {
  prefixes: ['nexusone://'],

  config: {
    screens: {
      MainNavigator: {
        screens: {
          DrawerNavigation: {
            screens: {
              BottomTabsNavigator: {
                screens: {
                  Home: {
                    screens: {
                      Home: 'Home',
                      Offer: 'Offer',
                      SmartParking: 'SmartParking',
                    },
                  },
                  Explore: {
                    screens: {
                      Explore: 'Explore',
                      Amenities: 'Amenities',
                    },
                  },
                  Scan: {
                    screens: {},
                  },
                  Navigate: 'Navigate',
                  Rewards: {
                    screens: {
                      Rewards: 'Rewards',
                    },
                  },
                },
              },

              AccountProfile: 'AccountProfile',
              TransactionHistory: 'TransactionHistory',
              FavouriteBrand: 'FavouriteBrand',
              TopTabNavigation: 'TopTabNavigation',
              UploadBillCapture: 'UploadBillCapture',
              AboutUs: 'AboutUs',
              ContactUs: 'ContactUs',
              TermsConditions: 'TermsConditions',
              PrivacyPolicy: 'PrivacyPolicy',
              GenerateRewardCode: 'GenerateRewardCode',
              FAQs: 'FAQs',
            },
          },
          Favourites: 'Favourites',
          MapNavigation: 'MapNavigation',
          FyndWebView: 'FyndWebView',
          UploadedBillHistory: 'UploadedBillHistory',
          EditProfile: 'EditProfile',
          NotificationWebView: 'NotificationWebView',
          UploadBillPreview: 'UploadBillPreview',
        },
      },
    },
  },
};
