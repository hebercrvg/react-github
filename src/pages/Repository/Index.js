import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import Container from '../../components/Container';
import api from '../../services/api';
import { Owner, Loading, IssueList } from './styles';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const repoName = decodeURIComponent(this.props.match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
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

  render() {
    const { repository, loading, issues } = this.state;

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
      </Container>
    );
  }
}
