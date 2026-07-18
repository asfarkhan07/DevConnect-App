import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGitHub = ({ username, getGithubRepos, repos, loading }) => {
  useEffect(() => {
    if (username) {
      getGithubRepos(username);
    }
  }, [getGithubRepos, username]);

  useEffect(() => {
  console.log('ProfileGitHub props:', { repos, loading });
}, [repos, loading]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>GitHub Repos</h2>
      {repos.length === 0 ? (
        <p>No repos found</p>
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
                <ul>
                    <li className='badge badge-primary' style={{'color':'black'}}>
                        Stars:{repo.stargazers_count}
                    </li>
                    <li className='badge badge-primary' style={{'color':'black'}}>
                        Watchers:{repo.watchers_count}
                    </li>
                    <li className='badge badge-dark' style={{'color':'black'}}>
                        Forks:{repo.forks_count}
                    </li>
                </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGitHub.propTypes = {
    getGithubRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
    username:PropTypes.string.isRequired,
}

const mapStateToProps=state=>({
    repos:state.profile.repos,
    loading:state.profile.loading,
});

export default connect(mapStateToProps,{getGithubRepos})(ProfileGitHub)