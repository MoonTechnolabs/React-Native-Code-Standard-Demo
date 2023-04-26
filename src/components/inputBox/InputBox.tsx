import React, { useContext } from 'react';
import { View } from 'react-native';
import { Input, InputProps } from 'react-native-elements';

import ContextData from 'utils/context';
import { IContext } from 'interfaces/common';

import STYLES from './InputBox.style';
interface InputBoxProps extends InputProps {
  refInput?: any,
  autoFocus: boolean
}

const propsDefaultData: InputBoxProps = {
  placeholder: 'Strings',
  autoFocus: false,
};

const InputBox = (props: InputBoxProps) => {

  const context: IContext = useContext(ContextData);
  const { theme } = context;
  const styles = STYLES({ ...theme });

  const { refInput, value, autoFocus, containerStyle, inputContainerStyle, inputStyle } = props;

  return (
    <View>
      <Input
        {...props}
        ref={refInput}
        autoCompleteType={undefined}
        value={value}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        style={{}}
        containerStyle={[styles.containerStyle, containerStyle]}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        inputStyle={[styles.inputStyle, inputStyle]}
      />
    </View>
  );
};

InputBox.defaultProps = propsDefaultData;

export default InputBox;
