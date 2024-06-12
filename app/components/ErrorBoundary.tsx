import React, { Component, ErrorInfo } from 'react';
import { useDispatch } from 'react-redux';
import { addBrokenReport } from '@store/slices/appSlice';
import { Text, Button, Overlay } from 'react-native-elements';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error details or send them to your analytics service
    console.log('Error:', error);
    console.log('Error Info:', errorInfo);

    // Collect device information
    // const deviceInfo = {
    //   appName: DeviceInfo.getApplicationName(),
    //   brand: DeviceInfo.getBrand(),
    //   model: DeviceInfo.getModel(),
    //   deviceID: DeviceInfo.getUniqueId(),
    //   systemName: DeviceInfo.getSystemName(),
    //   systemVersion: DeviceInfo.getSystemVersion(),
    //   bundleID: DeviceInfo.getBundleId(),
    //   appVersion: DeviceInfo.getVersion(),
    //   appBuildNumber: DeviceInfo.getBuildNumber(),
    // };

    // console.log('Device Info:', deviceInfo);

    // Dispatch an action to save the error details and device info to Redux
    const dispatch = useDispatch();
    dispatch(
      addBrokenReport({
        error: `${error.toString()}: ${JSON.stringify(errorInfo)}`,
        deviceInfo: JSON.stringify({}),
      })
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <Overlay isVisible={true}>
          <Text h4>Something Went Wrong</Text>
          <Text>
            There is something broken... please restart the app or reinstall the app.
          </Text>
          <Button title="Okay" onPress={() => {}} />
        </Overlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;