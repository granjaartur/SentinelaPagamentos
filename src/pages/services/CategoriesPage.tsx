import React from 'react';
import CategoryList from '../../components/services/CategoryList';

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;