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
      tags: [],
      suggestions: []
    }

    /*
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);*/

    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  /*
  handleTagDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleTagAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleTagDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }*/

  handleTagsChange = (tags) => {
    this.setState({tags})
  }

  render() {

    const { tags, suggestions } = this.state;

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
                <Form>
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
                      onChange={(e) => this.setState({url: e.target.value})}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="tags">Tags</Label>
                    <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
                    {/*
                    <div>
                      <ReactTags tags={tags}
                                  suggestions={suggestions}
                                  handleDelete={this.handleTagDelete}
                                  handleAddition={this.handleTagAddition}
                                  handleDrag={this.handleTagDrag}
                                  delimiters={delimiters}
                                  inline />
                    </div>*/}
                  </FormGroup>

                  <FormGroup inline>
                    <Button>Submit</Button>
                    <Button color='link' onClick={() => this.props.history.push('/')}>or Cancel and go back to Spaces Page</Button>
                    
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
