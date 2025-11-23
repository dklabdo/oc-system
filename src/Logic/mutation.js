

export const LOGIN_USER = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        fullName
        email
        role
      }
    }
  }
`;


export const ADD_UNIVERSITY = `
  mutation AddUniversity($input: UniversityInput!) {
    AddUniversity(input: $input) {
      name
      code
      address
      emailUniversity
    }
  }
`;


export const UPDATE_UNIVERSITY = `
  mutation UpdateUniversity($input: UniversityInput!) {
    UpdateUniversity(input: $input) {
      name
      code
      address
      emailUniversity
    }
  }
`;



export const DELETE_UNIVERSITY = `
  mutation DeleteUniversity($id: ID!) {
    DeleteUniversity(id: $id) {
      name
      code
    }
  }
`;


export const CREATE_DEPARTEMENT = `
  mutation CreateDepartement($input: DepartementInput!) {
    CreateDepartement(input: $input) {
      name
      description
      location
      establishedYear
    }
  }
`;



export const CREATE_SECTION = `
  mutation CreateSection($input: SectionInput!) {
    CreateSection(input: $input) {
      yearAcademic
      System
      Niveaux
      isSpeciality
    }
  }
`;



export const ADD_ACADIMIC_YEAR = `
  mutation AddAcadimicYear($departementId: ID!, $year: YearAcademic!) {
    addAcadimicYear(departementId: $departementId, year: $year) {
      startYear
      endYear
      isCurrent
      semester
    }
  }
`;



export const CREATE_MODULE = `
  mutation CreateModule($input: moduleIbput!) {
    CreateModule(input: $input) {
      name
      code
      Coef
      Credites
    }
  }
`;



export const CREATE_PROFESSEUR = `
  mutation CreateProfeseur($input: profeseutInput!) {
    createProfeseur(input: $input) {
      dateOfBirth
      gender
      designation
      address
      degree
      Modules {
        name
      }
    }
  }
`;
