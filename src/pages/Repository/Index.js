import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Container from '../../components/Container';
import api from '../../services/api';
import { Owner, Loading, IssueList, PageButtons } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {},
      loading: true,
      repoName: '',
      filters: [
        {
          state: 'all',
          label: 'Todas',
        },
        {
          state: 'open',
          label: 'Abertas',
        },
        {
          state: 'closed',
          label: 'Fechadas',
        },
      ],
      actualPage: 1,
      actualFilter: 'all',
    };
  }

  async componentDidMount() {
    const { actualFilter } = this.state;
    const repoName = decodeURIComponent(this.props.match.params.repository);
    this.setState({ repoName });
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: actualFilter,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate() {
    const { actualPage } = this.state;
  }

  handleFilterList = async e => {
    this.setState({ actualFilter: e.target.value });
    const { repoName, actualPage } = this.state;
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: e.target.value,
        per_page: 5,
        page: actualPage,
      },
    });

    this.setState({
      issues: response.data,
    });
  };

  handleIncrementPageList = async () => {
    const { actualPage, actualFilter, repoName } = this.state;
    const page = actualPage + 1;
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: actualFilter,
        page,
        per_page: 5,
      },
    });
    this.setState({
      issues: response.data,
      actualPage: page,
    });
  };

  handleDecrementPageList = async () => {
    const { actualPage, actualFilter, repoName } = this.state;
    const page = actualPage - 1;
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: actualFilter,
        page,
        per_page: 5,
      },
    });
    this.setState({
      issues: response.data,
      actualPage: page,
    });
  };

  render() {
    const { repository, loading, issues, filters } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner size={100} />
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <select onChange={this.handleFilterList}>
            {filters.map(filter => (
              <option value={filter.state}>{filter.label}</option>
            ))}
          </select>
          {issues.map(issue => (
            <li key={issue.id}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a target="_blank" href={issue.html_url}>
                    {issue.title}
                  </a>
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageButtons>
          <button type="button" onClick={this.handleDecrementPageList}>
            <FaAngleLeft />
          </button>
          <button type="button" onClick={this.handleIncrementPageList}>
            <FaAngleRight />
          </button>
        </PageButtons>
      </Container>
    );
  }
}
