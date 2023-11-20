/**
 * External dependencies.
 */
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

/**
 * Internal dependencies.
 */
import { Dashboard, Onboarding, Changelog } from './pages';
import { GeneralSettings, BlockSettings } from './pages/settings';

const App = () => {
    return (
        <>
            <Toaster position="top-center" toastOptions={{
                style: {
                    marginTop: '30px'
                },
            }} />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/getting-started" element={<Onboarding />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/settings" element={<GeneralSettings />} />

                {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </>
    )
}

export default App;