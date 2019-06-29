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
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import $ from 'jquery';

const axios = require('axios');

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class SpacePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      spaces: []
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    // Consulta para obtener todos los spaces
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3001/api/v1/spaces',
      dataType: 'JSON',
      headers: JSON.parse(sessionStorage.getItem('user'))
    })
    .done(resp => {
      console.log(resp)
      this.setState({ spaces: resp.data });
    });
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    const rows = [];
    let cols = [];

    let totalCount = 4;
    this.state.spaces.forEach((space, i) => {

      cols.push(space);

      if (i % totalCount == (totalCount - 1)){
        rows.push(cols);
        cols = [];
      }
    });
    
    if(cols.length > 0) rows.push(cols);

    return (
      <SecuredPage
        className="SpacePage"
        title="Spaces"
        breadcrumbs={[{ name: 'Spaces', active: true }]}
      >
        <Button color="primary" className={'buttonNew'} onClick={ () => this.props.history.push('/spaces/new') }>New space</Button>

        { 
          rows.map((cols, i) => {
            return (
              <SpaceRow cols={cols} key={i} />
            );
          }) 
        }

      </SecuredPage>
    );
  }
}
export default SpacePage;
