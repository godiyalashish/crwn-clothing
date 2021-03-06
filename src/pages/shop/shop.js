import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.scss';
import CollectionOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';

import WithSpinner from '../../components/with-spinner/with-spinner';

import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {

        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });

        });
    }

    render() {

        const { match } = this.props;
        const { loading } = this.state;
        return (

            <div className="collection-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render = {props => (
                        <CollectionsOverviewWithSpinner  isLoading={loading} {...props} />
                        )} 
                />

                <Route
                    path={`${ match.path }/:collectionId`}
                    render={props => (
                        <CollectionPageWithSpinner isLoading={ loading } {...props} />
                        )} 
                />
            </div>
        );
    }

}


const MapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, MapDispatchToProps)(ShopPage);