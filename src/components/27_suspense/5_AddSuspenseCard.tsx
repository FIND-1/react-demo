import React, { Suspense } from 'react';
import Card from './4_skeletonCard'
import { Skeleton } from './3_skeletonComponent'

// Suspense 里要配合 ErrorBoundary
interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <h2>出错了，数据请求失败！</h2>;
        }
        return this.props.children;
    }
}


const AddSuspenseCard: React.FC = () => {

    return (
        <>
            <h2>Suspense 示例</h2 >
            <ErrorBoundary>
                <Suspense fallback={<Skeleton />}>
                    <Card />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

export default AddSuspenseCard;
