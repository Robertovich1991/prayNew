import { convertDateForTitles, responsiveWidth, useCndUrl } from 'common/utils';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Share from 'react-native-share';
import CustomLine from './CustomLine';
import CustomText from './CustomText';
import ShareIcon from '../assets/img/icons/share.svg';
import Bookmark from '../assets/img/icons/bookmark.svg';
import ArticlesGradient from '../assets/img/articlesGradient.png';
import ArticlesWhiteGradient from '../assets/img/articlesWhiteGradient.png';
import store from 'store';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { MAIN_ARTICLES_URL } from 'constants/AppConfig';
import CustomWebView from './CustomWebView';
import { LogEvent, af_content_view } from 'helpers/logEvents';
import GetFirstWeekForFreeModalModal from 'screens/modals/GetFirstWeekForFreeModal';
import CustomVideoPlayer from './CustomVideoPlayer';
import { useNavigation } from '@react-navigation/native';
import Routes from 'navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import NotBlessedCardModal from 'screens/modals/NotBlessedCardModal';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ArticlesItemProps {
  article: Article;
  isSaved?: boolean;
}

const ArticlesItem = ({ article, isSaved }: ArticlesItemProps) => {
  const [activeBookmark, setActiveBookmark] = useState(isSaved);
  const [fulltext, setFullText] = useState(false);
  const { theme } = useTheme();

  const navigation =
    useNavigation<StackNavigationProp<{ [Routes.TARIF_SCREEN]: undefined }>>();

  const itemImg = useCndUrl(article.titleImageUrl);

  const t = useOwnTranslation;
  const message = `${t(
    T_KEYS.ARTICLES_SCREEN_SHARING_TEXT,
  )}:\n${MAIN_ARTICLES_URL}${article.id}`;

  const shareArticle = () => {
    Share.open({ message })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const showGetSubPopup = () => {
    if (store.userStore.isUserNew) {
      store.modalStore.open(
        <GetFirstWeekForFreeModalModal
          onBecomeBlessedClick={() => {
            navigation.navigate(Routes.TARIF_SCREEN);
            store.modalStore.close();
          }}
        />,
      );
    } else {
      store.modalStore.open(
        <NotBlessedCardModal
          buttonAction={() => {
            navigation.navigate(Routes.TARIF_SCREEN);
            store.modalStore.close();
          }}
        />,
      );
    }
  };

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <View>
        <View>
          {itemImg && !itemImg.includes('no-image.png') ? (
            <View>
              <Image style={styles.image} source={{ uri: itemImg }} />
              <Image
                style={styles.gradient}
                source={
                  theme.mode === 'dark'
                    ? ArticlesGradient
                    : ArticlesWhiteGradient
                }
              />
            </View>
          ) : store.userStore.isUserBlessed ? (
            <CustomWebView
              videoUrl={article.videoUrl}
              youtubeLink={article.youtubeLink}
            />
          ) : (
            <CustomVideoPlayer videoUrl={article.videoUrl} />
          )}
        </View>
        <View
          style={
            itemImg && !itemImg.includes('no-image.png')
              ? styles.imageTextWrapper
              : styles.imageTextWrapperVideo
          }
        >
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(17)}
            style={styles.date}
            fontWeight="light"
          >
            {convertDateForTitles(new Date(article.createdAt))}
          </CustomText>
          <View style={styles.titleIconsWrapper}>
            <CustomText
              fontSize={responsiveWidth(18)}
              lineHeight={responsiveWidth(27)}
              style={styles.title}
            >
              {t(article.title)}
            </CustomText>
            <View style={styles.iconsWrapper}>
              <TouchableOpacity
                onPress={() => {
                  if (store.userStore.isUserBlessed) {
                    setActiveBookmark(!activeBookmark);
                    store.articlesStore.toggleArticleSave(article);
                  } else {
                    showGetSubPopup();
                  }
                }}
              >
                <Bookmark
                  fill={
                    theme.mode === 'dark'
                      ? activeBookmark
                        ? CustomizationColors.get('GREEN_SECONDARY')
                        : CustomizationColors.get('WHITE')
                      : activeBookmark
                      ? CustomizationColors.get('ORANGE_PRIMARY')
                      : CustomizationColors.get('BLACK_PRIMARY')
                  }
                  width={responsiveWidth(22)}
                  height={responsiveWidth(22)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (store.userStore.isUserBlessed) {
                    shareArticle();
                  } else {
                    showGetSubPopup();
                  }
                }}
              >
                <ShareIcon
                  color={theme.colors.textColorPrimary}
                  width={responsiveWidth(22)}
                  height={responsiveWidth(22)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.wrapper}>
          <CustomLine />
          <CustomText
            fontWeight="light"
            color={theme.colors.textColorQuaternary}
            lineHeight={responsiveWidth(22)}
            numberOfLines={!fulltext ? 3 : 0}
            style={styles.text}
          >
            {t(article.text)}
          </CustomText>
        </View>
        {fulltext &&
        itemImg &&
        !itemImg.includes('no-image.png') &&
        (article?.videoUrl || article?.youtubeLink) ? (
          <View>
            <View style={styles.lineWrapper}>
              <CustomLine />
            </View>
            <CustomWebView
              videoUrl={article.videoUrl}
              youtubeLink={article.youtubeLink}
            />
          </View>
        ) : (
          <></>
        )}
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              if (!fulltext) {
                setFullText(true);
                store.articlesStore.viewArticle(article.id);
                LogEvent('af_content_view', { af_content_view });
              } else {
                setFullText(false);
              }
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(
                fulltext
                  ? T_KEYS.ARTICLES_SCREEN_SHOW_LESS
                  : T_KEYS.ARTICLES_SCREEN_SHOW_MORE,
              )}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: responsiveWidth(14),
    marginBottom: responsiveWidth(8),
  },
  image: {
    width: '100%',
    height: responsiveWidth(290),
    borderRadius: responsiveWidth(15),
  },
  gradient: {
    borderRadius: responsiveWidth(14),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  imageTextWrapper: {
    position: 'absolute',
    bottom: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(24),
    width: '100%',
  },
  imageTextWrapperVideo: {
    paddingHorizontal: responsiveWidth(24),
    marginBottom: responsiveWidth(12),
    width: '100%',
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: '100',
  },
  titleIconsWrapper: {
    marginTop: responsiveWidth(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    textTransform: 'uppercase',
    width: '60%',
  },
  iconsWrapper: {
    flexDirection: 'row',
    width: responsiveWidth(56),
    justifyContent: 'space-between',
    marginBottom: responsiveWidth(5),
  },
  wrapper: {
    paddingHorizontal: responsiveWidth(24),
  },
  textWrapper: {
    marginBottom: responsiveWidth(32),
  },
  text: {
    marginVertical: responsiveWidth(16),
  },
  lineWrapper: {
    marginBottom: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(24),
  },
});

export default ArticlesItem;
