'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          padding: '24px'
        }}>
          <Result
            status="error"
            title="Đã có lỗi xảy ra"
            subTitle={
              process.env.NODE_ENV === 'development' 
                ? this.state.error?.message 
                : 'Vui lòng thử lại sau hoặc liên hệ hỗ trợ.'
            }
            extra={[
              <Button type="primary" key="reload" onClick={() => window.location.reload()}>
                Tải lại trang
              </Button>,
              <Button key="home" onClick={() => window.location.href = '/'}>
                Về trang chủ
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

