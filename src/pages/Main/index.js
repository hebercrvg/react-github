import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Container from '../../components/Container';
import { Form, SubmitButton, List, ClearReposButton } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: false,
    };
    this.MySwal = withReactContent(Swal);
  }

  componentDidMount() {
    const repos = JSON.parse(localStorage.getItem('repositories'));
    if (repos) {
      this.setState({
        repositories: repos,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { newRepo, repositories } = this.state;
      this.setState({ loading: true });
      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) {
        this.setState({ error: true });
        return;
      }

      const response = await api.get(`/repos/${newRepo}`);
      const repoSearched = { name: response.data.full_name };
      this.setState({
        repositories: [...repositories, repoSearched],
        newRepo: '',
        error: false,
      });
    } catch {
      this.setState({ newRepo: '', error: true });
      this.MySwal.fire({
        title: 'Ops...',
        type: 'warning',
        text: `Repositório não encontrado. Verifique o nome informado.`,
      });
    } finally {
      this.setState({ loading: false, newRepo: '' });
    }
  };

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleClearStorage = () => {
    localStorage.clear();
    this.setState({
      repositories: [],
    });
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          React GitHub
        </h1>
        <ClearReposButton onClick={this.handleClearStorage}>
          Limpar Repositórios
        </ClearReposButton>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicione um repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {this.state.repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>

              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
