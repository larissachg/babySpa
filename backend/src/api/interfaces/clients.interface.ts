import {
  DatosClientes_Genero,
  DatosClientes_Parto,
  DatosPrimeraEvaluciacion_Auditivo,
  DatosPrimeraEvaluciacion_CabezaAlzada,
  DatosPrimeraEvaluciacion_Caminar,
  DatosPrimeraEvaluciacion_ContactoVisual,
  DatosPrimeraEvaluciacion_ControlCervical,
  DatosPrimeraEvaluciacion_EstadoAnimo,
  DatosPrimeraEvaluciacion_Gateo,
  DatosPrimeraEvaluciacion_Musculatura,
  DatosPrimeraEvaluciacion_Sentado,
  DatosPrimeraEvaluciacion_Visual,
} from "@prisma/client";

export interface ClientDataInterface {
  NombreBebe?: string;
  FechaNac?: Date;
  SemanaNac?: number;
  Parto?: DatosClientes_Parto;
  PesoNac?: number;
  PesoActual?: number;
  Genero: DatosClientes_Genero;
  NombreMama?: string;
  EdadMama?: number;
  NombrePapa?: string;
  EdadPapa?: number;
  Celular?: string;
  CodigoPais?: string;
  Email?: string;
  AutorizacionRrss?: boolean;
  UsuarioRrss?: string;
  ConocimientoBabySpa?: string;
}

export interface ClientMedicDataInterface {
  IdCliente: number;
  DificultadNacer?: string;
  EstimulacionPrevia?: string;
  CentroEstimulacionPrevia?: string;
  DiagnosticoAlteracion?: string;
  EnfermedadDiagnosticada?: string;
  MedicamentoReciente?: string;
}

export interface ClientInterface {
  datosCliente: ClientDataInterface;
  datosMedicos: ClientMedicDataInterface;
}

export interface FirstEvaluationInterface {
  IdCliente?: number;
  Visual?: DatosPrimeraEvaluciacion_Visual;
  ContactoVisual?: DatosPrimeraEvaluciacion_ContactoVisual;
  Auditivo?: DatosPrimeraEvaluciacion_Auditivo;
  Musculatura?: DatosPrimeraEvaluciacion_Musculatura;
  ControlCervical?: DatosPrimeraEvaluciacion_ControlCervical;
  CabezaAlzada?: DatosPrimeraEvaluciacion_CabezaAlzada;
  Sentado?: DatosPrimeraEvaluciacion_Sentado;
  Gateo?: DatosPrimeraEvaluciacion_Gateo;
  Caminar?: DatosPrimeraEvaluciacion_Caminar;
  EstadoAnimo?: DatosPrimeraEvaluciacion_EstadoAnimo;
}
