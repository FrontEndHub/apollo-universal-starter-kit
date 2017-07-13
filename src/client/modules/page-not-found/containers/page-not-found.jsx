import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Button } from 'reactstrap';
import Page from '../../../app/page';

const pageNotFound = () => (
  <Page>
    <section className="text-center mt-4 mb-4">
      <Helmet
        title='Apollo Starter Kit - Page not found'
        meta={[{
          name: 'description',
          content: 'Apollo Starter Kit - Page not found'
        }]}/>
      <h2>Page not found - 404</h2>
      <Link to="/">
        <Button className='home-link' color="primary">Go to Homepage</Button>
      </Link>
    </section>
  </Page>
);

export default pageNotFound;
