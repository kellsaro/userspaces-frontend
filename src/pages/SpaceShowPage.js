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
import $ from 'jquery';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class SpaceShowPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      url: '',
      tags: []
    }
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    $.ajax({
      type: 'GET',
      url: `http://localhost:3001/api/v1/spaces/${this.props.match.params.id}`,
      dataType: 'JSON',
      headers: JSON.parse(sessionStorage.getItem('user'))
    })
    .done(resp => {
      let space = resp.data;
      this.setState({ name: space.attributes.name, url: space.attributes.url, tags: space.attributes.tags});
    })
    .fail(e => {
      console.log(`Error: ${JSON.stringify(e)}`)
    });

  }

  render() {

    const { name, url, tags } = this.state;

    return (
      <SecuredPage
        className="SpacePage"
        title="Spaces"
        breadcrumbs={[{ name: 'spaces', active: true }]}
      >
       
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Show Space</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="space_name">Name</Label>
                    <Input
                      type="text"
                      id="space_name"
                      disabled="disabled"
                      value={this.state.name}
                    />
                  </FormGroup> 
                  
                  <FormGroup>
                    <Label for="space_url">URL</Label>
                    <Input
                      type="url"
                      id="space_url"
                      disabled="disabled"
                      value={this.state.url}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="tags">Tags</Label>
                    <div>
                    {
                      this.state.tags.map((t, i) => {
                        return (
                          <span className='react-tagsinput-tag' key={i}>{t.name}</span>
                        );
                      })
                    }
                    </div>
                  </FormGroup>

                  <FormGroup inline>
                    <Button onClick={ () => this.props.history.push(`/spaces/${this.props.match.params.id}/edit`) }>Edit</Button>
                    
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
export default SpaceShowPage;
