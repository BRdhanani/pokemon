import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './Style';

const AnimatedView = Animated.createAnimatedComponent(View);

function LabelBase(props) {
  const {position, value, leftDiff, pressed} = props;
  const scaleValue = useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
  const cachedPressed = useRef(pressed);

  useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1 : 0.1,
      duration: 200,
      delay: pressed ? 0 : 2000,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={{
          position: 'absolute',
          justifyContent: 'center',
          bottom: '100%',
          width: width,
          height: width,
          left: position - width / 2,
          transform: [
            {translateY: width},
            {scale: scaleValue.current},
            {translateY: -width},
          ],
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: -pointerWidth / 4,
            left: (width - pointerWidth) / 2,
            transform: [{rotate: '45deg'}],
            width: pointerWidth,
            height: pointerWidth,
            backgroundColor: '#999',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            lineHeight: width,
            borderRadius: width / 2,
            borderWidth: 2,
            borderColor: '#999',
            backgroundColor: '#fff',
            flex: 1,
            fontSize: 18,
            color: '#aaa',
          }}>
          {value}
        </Text>
      </AnimatedView>
    )
  );
}

const Filter = ({
  setFilter,
  setFilterArr,
  filterArr,
  setGender,
  gender,
  stat,
  setLow,
  setHigh,
  setApply,
  low,
  high,
}) => {
  const type = useSelector(state => state.home.type);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.filterContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Filters</Text>
            <TouchableOpacity onPress={() => setFilter(false)}>
              <Image
                source={require('../../assets/multiply.png')}
                style={{height: 20, width: 30}}
              />
            </TouchableOpacity>
          </View>
          <Collapse style={styles.collapse}>
            <CollapseHeader>
              <Text>Type</Text>
            </CollapseHeader>
            <CollapseBody>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                {type.map((item, index) => {
                  return (
                    <View key={index} style={styles.checkboxContainer}>
                      <View style={{flexDirection: 'row'}}>
                        <CheckBox
                          onValueChange={e => {
                            e
                              ? setFilterArr([...filterArr, item.name])
                              : setFilterArr(
                                  filterArr.filter(name => name !== item.name),
                                );
                          }}
                          style={styles.checkbox}
                          value={filterArr.includes(item.name)}
                        />
                        <Text key={index} style={styles.label}>
                          {item.name.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse style={styles.collapse}>
            <CollapseHeader>
              <Text>Gender</Text>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.checkboxContainer}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    style={styles.checkbox}
                    onValueChange={e => (e ? setGender('male') : setGender(''))}
                    value={gender == 'male'}
                  />
                  <Text style={styles.label}>Male</Text>
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    style={styles.checkbox}
                    onValueChange={e =>
                      e ? setGender('female') : setGender('')
                    }
                    value={gender == 'female'}
                  />
                  <Text style={styles.label}>Female</Text>
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    style={styles.checkbox}
                    onValueChange={e =>
                      e ? setGender('genderless') : setGender('')
                    }
                    value={gender == 'genderless'}
                  />
                  <Text style={styles.label}>Genderless</Text>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
          <Collapse style={styles.collapse}>
            <CollapseHeader>
              <Text>Stat</Text>
            </CollapseHeader>
            <CollapseBody>
              {stat.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{marginBottom: index == stat.length - 1 ? 100 : 0}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{alignSelf: 'center', paddingVertical: 20}}>
                        {item.label}
                      </Text>
                      <Text style={{alignSelf: 'center', paddingVertical: 20}}>
                        {low[item.key]}{' '}
                      </Text>
                      <Text style={{alignSelf: 'center', paddingVertical: 20}}>
                        {high[item.key]}
                      </Text>
                    </View>
                    <MultiSlider
                      values={[low[item.key], high[item.key]]}
                      min={0}
                      max={100}
                      step={1}
                      allowOverlap={false}
                      snapped
                      minMarkerOverlapDistance={40}
                      onValuesChange={values => {
                        low[item.key] = values[0];
                        setLow({...low});
                        high[item.key] = values[1];
                        setHigh({...high});
                      }}
                      customLabel={(
                        leftDiff,
                        oneMarkerValue,
                        twoMarkerValue,
                        oneMarkerLeftPosition,
                        twoMarkerLeftPosition,
                        oneMarkerPressed,
                        twoMarkerPressed,
                      ) => (
                        <View style={{position: 'relative'}}>
                          <LabelBase
                            position={oneMarkerLeftPosition}
                            value={oneMarkerValue}
                            leftDiff={leftDiff}
                            pressed={oneMarkerPressed}
                          />
                          <LabelBase
                            position={twoMarkerLeftPosition}
                            value={twoMarkerValue}
                            leftDiff={leftDiff}
                            pressed={twoMarkerPressed}
                          />
                        </View>
                      )}
                    />
                  </View>
                );
              })}
            </CollapseBody>
          </Collapse>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#FFFFFF',
          width: '100%',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setFilterArr([]);
            setGender();
            setLow({
              hp: 0,
              attack: 0,
              defense: 0,
              'special-attack': 0,
              'special-defense': 0,
              speed: 0,
            });
            setHigh({
              hp: 100,
              attack: 100,
              defense: 100,
              'special-attack': 100,
              'special-defense': 100,
              speed: 100,
            });
            setFilter(false);
            setApply(false);
          }}
          style={{
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            borderColor: '#2E3156',
          }}
          testID="reset">
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setApply(true);
            setFilter(false);
          }}
          style={{
            backgroundColor: '#2E3156',
            borderRadius: 8,
            padding: 10,
          }}
          testID="apply">
          <Text style={{color: '#FFFFFF'}}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;
