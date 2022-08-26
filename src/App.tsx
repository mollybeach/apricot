import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Components from './components/Components';
import LoginView from './views/authentication/LoginView';
import StudiosView from './views/studios/StudiosView';
import ArtistsView from './views/artists/ArtistsView';
import ArtistsProfile from './views/artists/ArtistsProfile';
import CreateStudio from './views/studios/CreateStudios/CreateStudio';
import CreatePlay from './views/plays/CreatePlays/CreatePlay';
import PlaysView from './views/plays/PlaysView';
import VenuesView from './views/venues/VenuesView';
import CreateVenue from './views/venues/CreateVenues/CreateVenue';
import AddArtists from './views/artists/CreateArtists/AddArtists';
import CreateProduction from './views/productions/CreateProductions/CreateProduction';
import TableView from './components/tableplot/TableView';
import ProductionsView from './views/productions/ProductionsView';
import CreateInstitution from './views/institutions/CreateInstitutions/CreateInstitution';
import InstitutionsView from './views/institutions/InstitutionsView';
import Upload from './components/Dropzone/Upload';
import { useQueryClient } from 'react-query';
import { LogoutView } from './views/logout/LogoutView';
import SetupAccountView from './views/authentication/SetupAccountView';
import ResetPasswordView from './views/authentication/ResetPasswordView';
import ResetPasswordConfirmView from './views/authentication/ResetPasswordConfirmView';

function App() {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>();
  const isUploadData = () => {
    const queryResult = queryClient.getQueryData(['uploadData']);
    setState(queryResult);
  };

  return (
    <>
      <Upload isUploadData={state}>
        <Header />
        <Routes>
          <Route index element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/reset-password" element={<ResetPasswordView />} />
          <Route
            path="/reset-password-confirm"
            element={<ResetPasswordConfirmView />}
          />
          <Route path="/login/setup" element={<SetupAccountView />} />
          <Route path="/logout" element={<LogoutView />} />
          <Route path={'/components'}>
            <Route index element={<Components isUpload={isUploadData} />} />
          </Route>
          <Route path={'/plays'}>
            <Route index element={<PlaysView />} />
            <Route path={'create'} element={<CreatePlay />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<CreatePlay />} />
            </Route>
          </Route>
          <Route path={'/venues'}>
            <Route index element={<VenuesView />} />
            <Route path={'create'} element={<CreateVenue />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<CreateVenue />} />
            </Route>
          </Route>
          <Route path="/institutions">
            <Route index element={<InstitutionsView />} />
            <Route path={'create'} element={<CreateInstitution />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<CreateInstitution />} />
            </Route>
          </Route>
          <Route path="/studios">
            <Route index element={<StudiosView />} />
            <Route path={'create'} element={<CreateStudio />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<CreateStudio />} />
            </Route>
          </Route>
          <Route path="/artists">
            <Route index element={<ArtistsView />} />
            <Route path={'create'} element={<AddArtists />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<AddArtists />} />
            </Route>
            <Route path={':id'} element={<ArtistsProfile />}>
              <Route path={'profile'} element={<ArtistsProfile />} />
            </Route>
          </Route>
          <Route path={'/productions'}>
            <Route index element={<ProductionsView />} />
            <Route path={'create'} element={<CreateProduction />} />
            <Route path={':id'}>
              <Route path={'edit'} element={<CreateProduction />} />
            </Route>
          </Route>
          <Route path="/table">
            <Route index element={<TableView />} />
          </Route>
        </Routes>
      </Upload>
    </>
  );
}

export default App;
