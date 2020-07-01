import * as _ from 'lodash';
import decorateComponentWithProps from 'decorate-component-with-props';
import extend from 'lodash/extend';
import React from 'react';
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HierarchicalMenuFilter,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  RangeFilter,
  NumericRefinementListFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  DynamicRangeFilter,
  InputFilter,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar,
  MenuFilter,
  FacetFilter,
} from 'searchkit';

import tableSVG from '@plone/volto/icons/table.svg';
import { Icon } from '@plone/volto/components';
import './theme.scss';
import { Table } from 'semantic-ui-react';

const GenericGridItem = (props) => {
  console.log('griditem props', props);
  const { bemBlocks, result } = props;
  const source = extend({}, result._source, result.highlight);
  const fieldTitle = props.data?.tile_title || 'title';
  const fieldDescription = props.data?.tile_description || 'description';
  const fieldImage = props.data?.tile_image || 'depiction';
  const fieldUrl = props.data?.tile_url || 'about';
  // const title = source[titleField];
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container('item'))}
      data-qa="hit"
    >
      <a href={source[fieldUrl]} target="_blank" rel="noreferrer">
        {/* {source[fieldImage] && ( */}
        {/*   <img */}
        {/*     data-qa="poster" */}
        {/*     alt="presentation" */}
        {/*     className={bemBlocks.item('poster')} */}
        {/*     src={source[fieldImage]} */}
        {/*     width="170" */}
        {/*     height="240" */}
        {/*   /> */}
        {/* )} */}
        <div data-qa="title" className={bemBlocks.item('title')}>
          {source[fieldTitle]}
        </div>
      </a>
    </div>
  );
};

const GenericListItem = (props) => {
  // console.log('item', props);
  const { bemBlocks, result } = props;
  let url = 'http://www.imdb.com/title/' + result._source.imdbId;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container('item'))}
      data-qa="hit"
    >
      <div className={bemBlocks.item('poster')}>
        {/* <img alt="presentation" data-qa="poster" src={result._source.poster} /> */}
      </div>
      <div className={bemBlocks.item('details')}>
        <a href={url} target="_blank" rel="noreferrer">
          <h2
            className={bemBlocks.item('title')}
            dangerouslySetInnerHTML={{ __html: source.title }}
          ></h2>
        </a>
        {/* <h3 className={bemBlocks.item('subtitle')}> */}
        {/*   Released in {source.year}, rated {source.imdbRating}/10 */}
        {/* </h3> */}
        {/* <div */}
        {/*   className={bemBlocks.item('text')} */}
        {/*   dangerouslySetInnerHTML={{ __html: source.plot }} */}
        {/* ></div> */}
      </div>
    </div>
  );
};

const GenericTable = (props) => {
  const fieldTitle = props.data?.tile_title || 'title';
  const fieldUrl = props.data?.tile_url || 'about';
  return (
    <Table celled>
      {(props.hits || []).map((item) => {
        const source = extend({}, item._source, item.highlight);
        // console.log('item', item);
        return (
          <tr>
            <td>
              <a href={source[fieldUrl]}>{source[fieldTitle]}</a>
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

const SearchKitView = ({ data }) => {
  const { es_index = {} } = data;
  const { host = 'http://localhost:3000', indexName = '' } = es_index;
  const url = `${host}/${indexName}`;
  // console.log('using es index ', url);
  const searchkit = React.useMemo(() => {
    return new SearchkitManager(url);
  }, [url]);

  return (
    <div>
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          {/* <TopBar></TopBar> */}

          <LayoutBody>
            <SideBar>
              {/* <HierarchicalMenuFilter */}
              {/*   fields={['type.raw', 'genres.raw']} */}
              {/*   title="Categories" */}
              {/*   id="categories" */}
              {/* /> */}
              {/* <DynamicRangeFilter */}
              {/*   field="metaScore" */}
              {/*   id="metascore" */}
              {/*   title="Metascore" */}
              {/*   rangeFormatter={(count) => count + '*'} */}
              {/* /> */}
              {/* <RangeFilter */}
              {/*   min={0} */}
              {/*   max={10} */}
              {/*   field="imdbRating" */}
              {/*   id="imdbRating" */}
              {/*   title="IMDB Rating" */}
              {/*   showHistogram={true} */}
              {/* /> */}
              {/* <InputFilter */}
              {/*   id="writers" */}
              {/*   searchThrottleTime={500} */}
              {/*   title="Writers" */}
              {/*   placeholder="Search writers" */}
              {/*   searchOnChange={true} */}
              {/*   queryFields={['writers']} */}
              {/* /> */}

              <MenuFilter
                id="typeOfData"
                title="Portal type"
                field="typeOfData"
                size={2}
              />

              <RefinementListFilter
                id="sectors"
                title="Adaptation sectors"
                field="sectors"
                size={10}
              />

              <RefinementListFilter
                id="climateImpacts"
                title="Climate impacts"
                field="climate_impacts"
                size={10}
              />

              <RefinementListFilter
                id="transnationalRegions"
                title="Transnational Regions"
                field="spatial"
                size={10}
              />

              <RefinementListFilter
                id="adaptationElements"
                title="Adaptation Elements"
                field="elements"
                size={10}
              />

              {/* <RefinementListFilter */}
              {/*   id="writersFacets" */}
              {/*   translations={{ 'facets.view_more': 'View more writers' }} */}
              {/*   title="Writers" */}
              {/*   field="writers.raw" */}
              {/*   operator="OR" */}
              {/*   size={10} */}
              {/* /> */}
              {/* <RefinementListFilter */}
              {/*   id="countries" */}
              {/*   title="Countries" */}
              {/*   field="countries.raw" */}
              {/*   operator="OR" */}
              {/*   size={10} */}
              {/* /> */}
              {/* <NumericRefinementListFilter */}
              {/*   id="runtimeMinutes" */}
              {/*   title="Length" */}
              {/*   field="runtimeMinutes" */}
              {/*   options={[ */}
              {/*     { title: 'All' }, */}
              {/*     { title: 'up to 20', from: 0, to: 20 }, */}
              {/*     { title: '21 to 60', from: 21, to: 60 }, */}
              {/*     { title: '60 or more', from: 61, to: 1000 }, */}
              {/*   ]} */}
              {/* /> */}
            </SideBar>
            <LayoutResults>
              {/* <div className="my-logo">Searchkit Acme co</div> */}
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={[]}
              />
              <ActionBar>
                <ActionBarRow>
                  <HitsStats
                    translations={{
                      'hitstats.results_found': '{hitCount} results found',
                    }}
                  />
                  <ViewSwitcherToggle />
                  <SortingSelector
                    options={[
                      { label: 'Relevance', field: '_score', order: 'desc' },
                      {
                        label: 'Latest Modifications',
                        field: 'modified',
                        order: 'desc',
                      },
                      {
                        label: 'Earliest Modifications',
                        field: 'modified',
                        order: 'asc',
                      },
                    ]}
                  />
                </ActionBarRow>

                <ActionBarRow>
                  <GroupedSelectedFilters />
                  <ResetFilters />
                </ActionBarRow>
              </ActionBar>

              {/* <ViewSwitcherConfig */}
              {/*   searchkit={this.searchkit} */}
              {/*   hitComponents={[ */}
              {/*     { key: 'grid', title: 'Grid', itemComponent: MovieHitsGridItem, defaultOption: true }, */}
              {/*     { key: 'list', title: 'List', itemComponent: MovieHitsListItem }, */}
              {/*     { key: 'custom-list', title: 'Custom List', listComponent: MovieList } */}
              {/*   ]} */}
              {/* /> */}
              {/* <ViewSwitcherHits */}
              {/*   searchkit={this.searchkit} */}
              {/*   highlightFields={['title']} */}
              {/*   hitsPerPage={12} */}
              {/*   sourceFilter={['title']} */}
              {/* /> */}
              {/* <ViewSwitcherToggle searchkit={this.searchkit} translations={{ Grid: 'My Grid' }} /> */}

              <ViewSwitcherHits
                hitsPerPage={12}
                highlightFields={['title', 'description']}
                sourceFilter={[]}
                hitComponents={[
                  {
                    key: 'grid',
                    title: 'Grid',
                    itemComponent: decorateComponentWithProps(GenericGridItem, {
                      data,
                    }),
                    defaultOption: true,
                  },
                  {
                    key: 'list',
                    title: 'List',
                    itemComponent: decorateComponentWithProps(GenericListItem, {
                      data,
                    }),
                  },
                  {
                    key: 'table',
                    title: <Icon name={tableSVG} size="18px" />,
                    listComponent: decorateComponentWithProps(GenericTable, {
                      data,
                    }),
                  },
                ]}
                scrollTo="body"
              />
              <NoHits suggestionsField={'title'} />
              <Pagination showNumbers={true} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    </div>
  );
};
export default SearchKitView;
