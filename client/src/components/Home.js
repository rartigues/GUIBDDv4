import React,{Fragment} from 'react';
import apiService from '../services/api.service';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSearchRut = this.onChangeSearchRut.bind(this);
    this.retrieveEmpleados = this.retrieveEmpleados.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmpleado = this.setActiveEmpleado.bind(this);
    this.delEmpleado = this.delEmpleado.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchEmpleado = this.searchEmpleado.bind(this);
    this.getCargo = this.getContrato.bind(this)

    this.state = {
      empleados: [],
      currentEmpleado: null,
      currentIndex: -1,
      searchRut: "",
      currentCargo: "",
    };
  }

  componentDidMount() {
    this.retrieveEmpleados();
  }

  onChangeSearchRut(e) {
    this.setState({
      searchRut: e.target.value,
    });
  }

  retrieveEmpleados() {
    apiService.getEmpleados()
      .then((response) => {
        this.setState({
          empleados: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  refreshList() {
    this.retrieveEmpleados();
    this.setState({
      currentEmpleado: null,
      currentIndex: -1,
      searchRut: "",
    });
  }

  delEmpleado(rut) {
    apiService.deleteEmpleado(rut)
      .then((response) => {
        this.setState({
          empleados: apiService.getEmpleados(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setActiveEmpleado(empleado, index) {
    this.setState({
      currentEmpleado: empleado,
      currentIndex: index,
      currentCargo: this.getContrato(empleado.RUT),
    });
  }

  searchEmpleado() {
    let rut= this.state.searchRut;
    apiService.getEmpleado(rut)
    .then((response) => {
      this.setState({
        empleados: response.data,
        // currentEmpleado: response.data,
      });
    });
  }

    getContrato(rut){
        apiService.getContrato(rut)
        .then((response) => {
            this.setState({
                currentCargo: response.data.cargo,
            });
        });
    }

  render() {
    const { currentEmpleado, currentIndex, empleados, searchRut, currentCargo } = this.state;

    let style = {
        marginRight: '3px',
    }
    return (

        //Small selection list with all the empleados to select


        <Fragment>
            <div className="container">
                {/* <div className="row">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Buscar por RUT" aria-label="Buscar por RUT" aria-describedby="basic-addon2" value={searchRut} onChange={this.onChangeSearchRut} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.searchEmpleado}>Buscar</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Lista de Empleados</h4>
                        <ul className="list-group">
                            {empleados.map((empleado, index) => (
                                <li className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => this.setActiveEmpleado(empleado, index)}
                                    key={empleado.RUT}>
                                    {empleado.RUT} - {empleado.nombre} {empleado.apellido}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6" >
                        {currentEmpleado ? (
                            <div>
                                <h4>Empleado Seleccionado</h4>
                                <div>
                                    <label>RUT: </label> {currentEmpleado.RUT}
                                </div>
                                <div>
                                    <label>Nombre: </label> {currentEmpleado.nombre}
                                </div>
                                <div>
                                    <label>Apellido: </label> {currentEmpleado.apellido}
                                </div>
                                <div>
                                    <label>Cargo: </label> {currentCargo}
                                </div>
                                <div>
                                    <p></p>
                                </div>
                                <div>
                                    {/* Boton para marcar trabajando */}
                                    <button style={style} className="btn btn-success" onClick={() => this.setActiveEmpleado(currentEmpleado, currentIndex)}>Trabajando</button>
                                    <button style={style} className="btn btn-danger" onClick={() => this.setActiveEmpleado(currentEmpleado, currentIndex)}>Ausente</button>
                                    <button style={style} className="btn btn-warning " onClick={() => this.delEmpleado(currentEmpleado.RUT)}>
                                        X
                                    </button>
                                    
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>Seleccione un empleado de la lista</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }
}













// function Home(){
//     return (

//         <Fragment>
//             <h1>Bienvenid@!</h1>
//             <p>Para ingresar tu horario de entrada o salida</p>
//             <form>
//                 <div class="form-group">
//                     <label for="exampleInputEmail1">Email address</label>
//                     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
//                 </div>
//                 <div class="form-group">
//                     <label for="exampleInputPassword1">Password</label>
//                     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
//                 </div>
//                 <div class="form-check">
//                     <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
//                         <label class="form-check-label" for="exampleCheck1">Check me out</label>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Submit</button>
//             </form>

//         </Fragment>
//     );



        
// }

// export default Home;
