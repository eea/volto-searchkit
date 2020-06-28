import React from 'react';
import { SearchkitBlockSchema } from './schema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import SearchKitView from './SearchKitView';

const SearchKitEdit = (props) => (
  <div>
    <SearchKitView {...props} />
    <SidebarPortal selected={props.selected}>
      <InlineForm
        schema={SearchkitBlockSchema}
        title={SearchkitBlockSchema.title}
        onChangeField={(id, value) => {
          props.onChangeBlock(props.block, {
            ...props.data,
            [id]: value,
          });
        }}
        formData={props.data}
      />
    </SidebarPortal>
  </div>
);

export default SearchKitEdit;
