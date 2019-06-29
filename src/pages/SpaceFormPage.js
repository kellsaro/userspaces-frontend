import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import SecuredPage from 'components/SecuredPage';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget, SpaceRow } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';

import { WithContext as ReactTags } from 'react-tag-input';

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import $ from 'jquery';

const axios = require('axios');

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SpaceFormPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      url: '',
      tags: []
    }

    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    if(this.props.match.params.id){
      $.ajax({
        type: 'GET',
        url: `http://localhost:3001/api/v1/spaces/${this.props.match.params.id}`,
        dataType: 'JSON',
        headers: JSON.parse(sessionStorage.getItem('user'))
      })
      .done(resp => {
        let space = resp.data;
        this.setState({ id: space.id, name: space.attributes.name, url: space.attributes.url});
        
        let attr_tags = space.attributes.tags;
        let tags = [];

        for(let i in attr_tags){ 
          tags.push( attr_tags[i].name )
        }

        this.setState({ tags: tags });
      })
      .fail(e => {
        console.log(`Error: ${JSON.stringify(e)}`)
      });
    }
  }

  handleTagsChange = (tags) => {
    this.setState({tags})
    console.log(`tags: ${JSON.stringify(this.state.tags)}`)
  }

  handleSubmit = () => {
    if(this.props.match.params.id){
      $.ajax({
        type: 'PUT',
        url: `http://localhost:3001/api/v1/spaces/${this.props.match.params.id}`,
        dataType: 'JSON',
        data: this.state,
        headers: JSON.parse(sessionStorage.getItem('user'))
      })
      .done(resp => {
        this.props.history.push(`/spaces/${this.props.match.params.id}`, { severity: 'success', message: 'Information updated successfully' });
      })
      .fail(e => {
        this.props.history.push(`/spaces/${this.props.match.params.id}/edit`, { severity: 'danger', message: 'There are erros in the data' });
      });
    }
    else{
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3001/api/v1/spaces',
        dataType: 'JSON',
        data: this.state,
        headers: JSON.parse(sessionStorage.getItem('user'))
      })
      .done(resp => {
        console.log(JSON.stringify(resp))
        this.props.history.push('/', { severity: 'success', message: 'Information created successfully' });
      })
      .fail(e => {
        this.props.history.push(`/spaces/new`, { severity: 'danger', message: 'There are erros in the data' });
      });
    }
  }

  render() {

    return (
      <SecuredPage
        className="SpacePage"
        title="Spaces"
        breadcrumbs={[{ name: 'Spaces', active: true }]}
      >
       
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>
              { this.props.match.path === '/spaces/new' ? 'New' : 'Edit' } Space
              </CardHeader>
              <CardBody>

                { this.props.location 
                  && this.props.location.state
                  && this.props.location.state.severity
                  && (
                    <Alert color={this.props.location.state.severity}>
                      {this.props.location.state.message}
                    </Alert>
                  )
                }

                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="space_name">Name</Label>
                    <Input
                      type="text"
                      name="space[name]"
                      id="space_name"
                      placeholder="space name"
                      value={this.state.name}
                      onChange={(e) => this.setState({name: e.target.value})}
                    />
                  </FormGroup> 
                  
                  <FormGroup>
                    <Label for="space_url">URL</Label>
                    <Input
                      type="url"
                      name="space[url]"
                      id="space_url"
                      placeholder="url"
                      value={this.state.url}
                      onChange={(e) => this.setState({url: e.target.value})}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="tags">Tags</Label>
                    <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
                  </FormGroup>

                  <FormGroup inline>
                    <Button onClick={this.handleSubmit}>{ this.props.match.path === '/spaces/new' ? 'Create' : 'Update' }</Button>
                    <Button color='link' onClick={() => this.props.history.push('/')}>or Go back to Spaces Page</Button>
                    
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </SecuredPage>
    );
  }
}
export default SpaceFormPage;
