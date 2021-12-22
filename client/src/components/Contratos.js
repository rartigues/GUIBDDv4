import React,{Fragment} from 'react';
import apiService from '../services/api.service';


export default class Contratos extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveContratos = this.retrieveContratos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveContrato = this.setActiveContrato.bind(this);
    this.getDepartamento = this.getDepartamento.bind(this);

    this.state = {
      contratos: [],
      currentContrato: null,
      currentIndex: -1,
      currentCargo: "",
    };
  }

  componentDidMount() {
    this.retrieveContratos();
  }

  retrieveContratos() {
    apiService.getAllContratos()
      .then((response) => {
        this.setState({
          contratos: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  refreshList() {
    this.retrieveContratos();
    this.setState({
      currentEmpleado: null,
      currentIndex: -1,
      searchRut: "",
    });
  }

  setActiveContrato(contrato, index) {
    this.setState({
      currentContrato: contrato,
      currentIndex: index,
      currentCargo: '',
    });
  }

  getDepartamento(id) {
    switch(id) {
      case 1:
        return "Contabilidad";
      case 2:
        return "Marketing";
      case 3:
        return "Recursos humanos";
      default:
        return "";
    }
  }

//   searchEmpleado() {
//     let rut= this.state.searchRut;
//     apiService.getEmpleado(rut)
//     .then((response) => {
//       this.setState({
//         empleados: response.data,
//         // currentEmpleado: response.data,
//       });
//     });
//   }

    // getContrato(rut){
    //     apiService.getContrato(rut)
    //     .then((response) => {
    //         this.setState({
    //             currentCargo: response.data.cargo,
    //         });
    //     });
    // }

  render() {
    // const { currentEmpleado, currentIndex, empleados, searchRut, currentCargo } = this.state;
    const { contratos, currentContrato, currentIndex, currentCargo } = this.state;

    return (
        // Lista de todos los contratos de la empresa
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Contratos</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID Contrato</th>
                                                    <th>Departamento</th>
                                                    <th>Rut_t</th>
                                                    <th>Cargo</th>
                                                    <th>Dias libres</th>
                                                    <th>Jornada</th>
                                                    <th>Porcentaje HX</th>
                                                    <th>Sueldo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contratos.map((contrato, index) => (
                                                    <tr key={index}>
                                                        <td>{contrato.ID_contrato}</td>
                                                        <td>{this.getDepartamento(contrato.ID_departamento)}</td>
                                                        <td>{contrato.RUT_e}</td>
                                                        <td>{contrato.cargo}</td>
                                                        <td>{contrato.dias_libres}</td>
                                                        <td>{contrato.jornada}</td>
                                                        <td>{contrato.p_horas_extras}</td>
                                                        <td>{contrato.sueldo}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }

}
