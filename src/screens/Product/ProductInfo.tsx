import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import { BASE_URL } from '~/utils/constant';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import MarginBottom from '~/components/universal/margin/MarginBottom';
import Blinder from '~/components/product/Blinder';
import ProductInfoImage from '~/containers/product/info/ProductInfoImage';
import LineGrayMiddle from '~/components/universal/line/LineGrayMiddle';
import ProductInfoNameManufacturer from '~/containers/product/info/ProductInfoNameManufacturer';
import MarginMedium from '~/components/universal/margin/MarginMedium';
import ProductInfoSpecific from '~/containers/product/info/ProductInfoSpecific';
import ProductInfoScore from '~/containers/product/info/ProductInfoScore';
import ProductInfoReview from '~/containers/product/info/ProductInfoReview';
import TopBarBackArrow from '~/components/universal/topBar/TopBarBackArrow';
import ProductInfoBar from '~/components/universal/bottomBar/product/ProductInfoBar';
import TextTitlePurpleRight from '~/components/universal/text/TextTitlePurpleRight';
import AsyncStorage from '@react-native-community/async-storage';
import { UserId, AsyncAccessToken } from '~/utils/asyncStorage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const ProductInfo = ({ route, navigation }) => {
  const { productId } = route.params;
  const [token, setToken] = useState(null);
  const [userIdFS, setUserIdFS] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  const _getProductInfo = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/products/condom/${JSON.stringify(productId)}/`
      );
      const json = await response.json();
      console.log('🍒 product info success', productInfo);
      setProductInfo(json);
    } catch (error) {
      console.log('🍒product info error', error);
    }
  };

  const _likeProduct = async () => {
    const model = 'product';
    const object_id = productId;
    const user = userIdFS;
    try {
      const _token = await AsyncStorage.getItem(AsyncAccessToken);
      const _userIdFS = await AsyncStorage.getItem(UserId);
      setUserIdFS(_userIdFS);
      setToken(_token);
      console.log('1-1. 🍊like token 잘 가져옴 ', token);
      console.log('1-2.🍊userId도...', userIdFS);
    } catch (e) {
      console.error('1. 🍊like error - token 안 가져와');
    }

    try {
      const response = await fetch(`${BASE_URL}/likes/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model,
          object_id,
          user,
        }),
      });
      console.log('2. 🍊like post 성공! ', response);
    } catch (error) {
      console.log('2. 🍊like 에러 ', error);
    }
  };

  useEffect(() => {
    _getProductInfo();
    _likeProduct();
  }, []);

  return (
    <>
      {productInfo === null ? (
        <TextTitlePurpleRight title={'Loading...'} />
      ) : (
        <ProductInfoBar productId={productId}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TopBarBackArrow />
            <Container>
              <TouchableOpacity
                onPress={() => {
                  _likeProduct();
                }}
                style={{ height: 200, width: 200, backgroundColor: 'yellow' }}
              >
                <Text>Like Test</Text>
              </TouchableOpacity>
              <ProductInfoImage imageUri={productInfo.image} />
              <MarginMedium />
              <ProductInfoNameManufacturer
                nameKor={productInfo.name_kor}
                nameEng={productInfo.name_eng}
                manufacturerKor={productInfo.manufacturer_kor}
                manufacturerEng={productInfo.manufacturer_eng}
              />
              <MarginMedium />
              <LineGrayMiddle />
              <MarginMedium />
              <ProductInfoSpecific
                category={productInfo.category}
                length={productInfo.length}
                width={productInfo.width}
                thickness={productInfo.thickness}
              />
              <MarginMedium />
              <LineGrayMiddle />
              <MarginMedium />
              <ProductInfoScore
                score={productInfo.score}
                avgOily={productInfo.avg_oily}
                avgThickness={productInfo.avg_thickness}
                avgDurability={productInfo.avg_durability}
              />

              <MarginMedium />
              <LineGrayMiddle />
              <MarginMedium />
              <ProductInfoReview
                reviewNum={productInfo.num_of_reviews}
                productId={productId}
              />
            </Container>
          </ScrollView>
          <MarginBottom />
        </ProductInfoBar>
      )}
      <Blinder />
      {/* Blinder: 스크린의 가장 마지막에 놓아주어야 터치가 됨*/}
    </>
  );
};

export default ProductInfo;
