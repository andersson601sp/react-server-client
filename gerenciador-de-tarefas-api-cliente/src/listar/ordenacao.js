import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Ordenacao(props) {

   function handleAscDesc(){
       return ( props.ordenarAsc || props.ordenarDesc) ? 'hidden' : '';
   }

   function handleAsc(){
        return  props.ordenarDesc ? '' : 'hidden';
   }

   function handleDesc(){
        return  props.ordenarAsc ? '' : 'hidden';
    }   

   return (
       <span>
          <FontAwesomeIcon
            icon={faSort}
            className={handleAscDesc()}
            data-testid="faSort" />
          <FontAwesomeIcon
            icon={faSortUp}
            className={handleAsc()}
            data-testid="faSortUp" />
          <FontAwesomeIcon
            icon={faSortDown}
            className={handleDesc()}
            data-testid="faSortDown" />
       </span>
   )
}

Ordenacao.propTypes = {
    ordenarAsc: PropTypes.bool.isRequired,
    ordenarDesc: PropTypes.bool.isRequired
}

export default Ordenacao;