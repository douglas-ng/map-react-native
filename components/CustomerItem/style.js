import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  customerItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  customerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfoContainer: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  customerDetails: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
    padding: 10,
  },
  iconCam: {
    color: 'green',
  },
  iconLocation: {
    color: 'orange',
  },
  imageList: {
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default styles;