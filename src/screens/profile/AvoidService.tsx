import { useTheme } from '@rneui/themed';
import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import Container from 'components/Container';
import CustomText from 'components/CustomText';
import TopBar from 'components/TopBar';
import { useCurrentUser } from 'hooks';
import useOwnTranslation from 'hooks/useOwnTranslation';
import React from 'react';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';

const AvoidService = () => {
  const t = useOwnTranslation;
  const { userName } = useCurrentUser();
  const { theme } = useTheme();
  const openMail = () => {
    Linking.openURL('mailto:prayersonlyafrica@gmail.com');
  };

  return (
    <Container>
      <TopBar text={t(T_KEYS.PROFILE_SCREEN_AVOID_SERVICE)} backArrow={true} />
      <ScrollView style={styles.scrollView}>
        <View>
          <CustomText
            color={theme.colors.textColorSecondary}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(22)}
            style={styles.subtitle}
          >
            {`Dear ${userName},`}
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            We are sorry to hear that you wish to delete your account on our
            mobile application. We value your feedback and understand that
            sometimes circumstances change. To ensure the security and privacy
            of our users, we have implemented a manual account deletion process.
          </CustomText>
          <CustomText style={styles.text}>
            To proceed with the deletion of your account, we kindly request you
            to send us an email at
            <CustomText color={'#3e79f7'} onPress={openMail}>
              {' '}
              prayersonlyafrica@gmail.com{' '}
            </CustomText>
            <CustomText>
              with the subject line "Account Deletion Request." Please include
              the following information in your email:
            </CustomText>
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            {`Your registered email address,
Your username (if applicable).`}
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            Our team will handle your request promptly and securely. Please note
            that once your account is deleted, all associated data, including
            your personal information, preferences, and activity, will be
            permanently removed from our system. This action cannot be reversed,
            and you will no longer have access to your account or its contents.
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            We sincerely appreciate the time you spent with our mobile
            application and regret any inconvenience caused. If there is
            anything we can do to improve your experience or address any
            concerns, please do not hesitate to reach out to us. We value your
            feedback and strive to provide the best service to our users.
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            Thank you for your understanding and cooperation.
          </CustomText>
          <CustomText
            style={styles.text}
            color={theme.colors.textColorSecondary}
          >
            Best regards.
          </CustomText>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: responsiveWidth(50),
  },
  subtitle: {
    marginBottom: responsiveWidth(10),
  },
  text: {
    textAlign: 'justify',
    marginBottom: responsiveWidth(10),
  },
});

export default AvoidService;
