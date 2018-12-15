import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Text}  from "react-native";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LottieView from "lottie-react-native";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(70);
const itemHorizontalMargin = wp(20);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


const makeExample = (name, getJson, width) => ({ name, getJson, width });

const ENTRIES1 = [
    makeExample('Hamburger Arrow (200 px)', () => require('../../../assets/sloop'), 200),
    makeExample('Hamburger Arrow (200 px)', () => require('../../../assets/sloop'), 200),
    makeExample('Hamburger Arrow (200 px)', () => require('../../../assets/sloop'), 200),
];

class CarouselView extends Component {


    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1,
            example: ENTRIES1,
            duration: 3000,
            isPlaying: true,
            isInverse: false,
            loop: true,
        };
    }


    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <View style={ styles.contentLotie }>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LottieView
                        ref={animation => { this.animation = animation;} }
                        autoPlay
                        style={[item.width && { width: item.width }]}
                        source={item.getJson()}
                        loop
                        enableMergePathsAndroidForKitKatAndAbove
                    />
                </View>
            </View>
        );
    }

    render() {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    data={ENTRIES1}
                    ref={c => this._slider1Ref = c}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    hasParallaxImages={true}
                    firstItem={1}
                    loop={true}
                    itemWidth={itemWidth}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'#b6b5bc'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={'#000'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }
}

export default CarouselView;

const styles = StyleSheet.create({
    svgImage: {
        width: 100,
        height: slideHeight - 20,
    },
    contentLotie :{
        width: slideWidth - 50,
        height: slideHeight,
        backgroundColor: '#efecff',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    paginationContainer: {
        paddingVertical:3,
        marginBottom: 5
    },
    exampleContainer: {
        paddingVertical: 0
    },
});