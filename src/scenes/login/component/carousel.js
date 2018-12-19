import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Text, Image}  from "react-native";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LottieView from "lottie-react-native";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(70);
const itemHorizontalMargin = wp(10);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


const makeExample = (name, image, width) => ({ name, image, width });

const ENTRIES1 = [
    makeExample('Hamburger Arrow (200 px)', require('../../../assets/F1.png'), viewportWidth),
    makeExample('Hamburger Arrow (200 px)', require('../../../assets/F2.png'), viewportWidth),
    makeExample('Hamburger Arrow (200 px)', require('../../../assets/F3.png'), viewportWidth),
    makeExample('Hamburger Arrow (200 px)', require('../../../assets/F4.png'), viewportWidth),
];

class CarouselView extends Component {


    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1,
            example: ENTRIES1,
            duration: 6000,
            isPlaying: true,
            isInverse: false,
            loop: true,
        };
    }


    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
             <View style={styles.svgImage} >
                <Image source={item.image}
                       style={{ width: sliderWidth, height: slideHeight }}
                       resizeMode='center'
                />
                 <Text>{ item.name }</Text>
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
                    autoplayInterval={10000}
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
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    svgImage: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    paginationContainer: {
        paddingVertical:3,
        marginBottom: 5
    },
    exampleContainer: {
        paddingVertical: 0
    },
});