/* eslint-disable quotes */
import { T_KEYS } from 'assets/translations';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from 'components/Container';
import TopBar from 'components/TopBar';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { ScrollView } from 'react-native';
import { responsiveWidth } from 'common/utils';
import CustomText from 'components/CustomText';
import { useTheme } from '@rneui/themed';

const PrivacyPolicy = () => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <Container>
      <TopBar text={t(T_KEYS.POLICY_SCREEN_TITLE)} backArrow={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            PRAY
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`“Pray” (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our mobile application (the “Application”). Please read this Privacy Policy carefully. IF YOU DISAGREE WITH THIS PRIVACY POLICY'S TERMS, PLEASE DO NOT ACCESS THE APPLICATION.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.

This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.`}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            COLLECTION OF YOUR INFORMATION
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use and include:`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Personal Data
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as chatting, posting messages in comment sections or in our forums, liking posts, and sending feedback.`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Derivative Data
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`The information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including liking, re-blogging, or replying to a post, as well as other interactions with the Application and other users via server log files.`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Financial Data
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application. We store only very limited, if any, financial information that we collect.`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Mobile Device Access
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`We may request access or permission to certain features from your mobile device, including your mobile device’s [bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. If you wish to change our access or permissions, you may do so in your device’s settings.`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Mobile Device Data
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`Device information such as your mobile device ID number, model, and manufacturer, version of your operating system, phone number, country, location, and any other data you choose to provide.`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            Push Notifications
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`We may request to send you push notifications regarding your account or the Application. If you wish to opt out from receiving these types of communications, you may turn them off in your device’s settings.`}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            USE OF YOUR INFORMATION
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`Accurate information about you allows us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:`}
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Fulfill and manage purchases, orders, payments, and other
            transactions related to the Application.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Increase the efficiency and operation of the Application.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Monitor and analyze usage and trends to improve your experience
            with the Application.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Notify you of updates to the Application.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Offer new products, services, mobile applications, and/or
            recommendations to you.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Perform other business activities as needed.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Prevent fraudulent transactions, monitor against theft, and
            protect against criminal activity.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Process payments and refunds.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Request feedback and contact you about your use of the
            Application.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Respond to product and customer service requests.
          </CustomText>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(15)}
            style={styles.list}
          >
            — Solicit support for the Application.
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            SECURITY OF YOUR INFORMATION
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.`}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            POLICY FOR CHILDREN
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`We do not knowingly solicit information from or market to children under 13. If you become aware of any data we have collected from children under the age of 13, please contact us using the contact information provided below.`}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(21)}
            lineHeight={responsiveWidth(25)}
            style={styles.title}
          >
            CONTACT US
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`You can get in touch with us using the contact information below

[URUS FZCO]

[Dubai Silicon Oasis, DDP, Building A2]

[Dubai, United Arab Emirates]

[+971 5 276 48 935]

[Prayersonlyafrica@gmail.com]`}
          </CustomText>
        </View>
        <View></View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: responsiveWidth(50),
  },
  item: {
    marginBottom: responsiveWidth(15),
  },
  title: {
    marginBottom: responsiveWidth(15),
  },
  text: {
    textAlign: 'justify',
  },
  subtitle: {
    marginVertical: responsiveWidth(10),
  },
  list: {
    marginTop: responsiveWidth(5),
  },
});

export default PrivacyPolicy;
