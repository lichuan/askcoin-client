import React, {Component} from "react";

import {View, Text, StyleSheet, Modal} from "react-native";

export default class ModalView extends Modal {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    animationType: "none",
    transparent: true,
    visible: true,
    onShow: () => {},
    onRequestClose: () => {}
  };
}
