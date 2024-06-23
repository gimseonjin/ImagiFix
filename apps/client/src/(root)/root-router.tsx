import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreditsPage from './credits/page';
import ProfilePage from './profile/page';
import Transformation from './transformation/[id]/page';
import TransformationUpdate from './transformation/[id]/update/page';
import TransformationAdd from './transformation/add/[type]/page';
import HomePage from "./page.tsx";

const RootRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/credits" element={<CreditsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/transformations/:id" element={<Transformation />} />
                <Route path="/transformations/:id/update" element={<TransformationUpdate />} />
                <Route path="/transformations/add/:type" element={<TransformationAdd />} />
            </Routes>
        </Router>
    );
}

export default RootRouter;
