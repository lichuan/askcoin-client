import React, {
  Component,
} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  PanResponder,
  Text,
  Image,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	rightItems: PropTypes.func, 
	leftItems: PropTypes.func,
	headerTitle: PropTypes.string,
	showShadow: PropTypes.bool,
}

const defaultProps = {
	headerTitle: '',
	showShadow: false,
}


const IphoneTop = isIphoneX() ? 40 : 20;

const styles = StyleSheet.create({
	container: {
		width: ScreenWidth,
		height: 44,
		backgroundColor: COLOR.normalColor,
		paddingTop: Platform.OS === 'ios' ? IphoneTop : 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position:'relative',
	},
	left: {
		bottom: 0,
		left: 0,
		position:'absolute',
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
	},
	right: {
		bottom: 0,
		right: 0,
		position:'absolute',
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		paddingRight: 10,
	},
	title: {
	},
	text: {
        fontSize:FONTSIZE.primary,
        color:COLOR.primaryTextColor,
	},
	shadow: {
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray',
	}
})


export default class HeaderView extends Component {
	render() {
		let {
			leftItems,
			rightItems,
			headerTitle,
			showShadow
		} = this.props;

		let headerViewStyle = [styles.container,showShadow?styles.shadow:{}];

		return (
			<View style={headerViewStyle}>
				<View style={styles.left}>
					{leftItems && leftItems()}
				</View>
				<View style={styles.title}>
					<Text style={styles.text}>{headerTitle}</Text>
				</View>
				<View style={styles.right}>
					{rightItems && rightItems()}
				</View>
			</View>
		);
	}
}
HeaderView.propTypes = propTypes;
HeaderView.defaultProps = defaultProps;