import React from 'react';
import { SearchkitBlockSchema } from './schema';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import SearchKitView from './SearchKitView';
import { FormProvider, FormContext } from './Form';

const SearchKitEdit = (props) => (
  <div>
    <SearchKitView {...props} />
    <SidebarPortal selected={props.selected}>
      <FormProvider defaultValue={props.data}>
        <FormContext.Consumer>
          {({ form, setForm }) => (
            <InlineForm
              schema={SearchkitBlockSchema}
              title={SearchkitBlockSchema.title}
              onChangeField={(id, value) => {
                setForm({ ...form, [id]: value });
                props.onChangeBlock(props.block, {
                  ...props.data,
                  [id]: value,
                });
              }}
              formData={props.data}
            />
          )}
        </FormContext.Consumer>
      </FormProvider>
    </SidebarPortal>
  </div>
);

export default SearchKitEdit;
