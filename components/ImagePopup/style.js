import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
    width: '70%'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    width: '45%',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
    marginHorizontal: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 5,
    borderBottomLeftRadius: 5
  },
  deleteButtonText: {
    color: 'white',
  },
  closeButton: {
    padding: 10,
  },
  buttonIcon: {
    color: 'gray'
  },
  buttonText: {
    fontSize: 18,
    color: 'gray',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',    
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    width: '50%',
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;