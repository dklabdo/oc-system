
export const FIND_ALL_UNIVERSITY = `
  query FindAllUniversity {
    findAllUniversity {
      name
      code
      address
      logo
      establishedYear
      emailUniversity
    }
  }
`;



export const GET_ALL_DEPARTEMENT = `
  query GetAllDepertement {
    getAllDepertement {
      name
      description
      location
      establishedYear
    }
  }
`;


export const GET_ALL_SECTION_BY_DEPARTEMENT_ID = `
  query GetAllSectionByDepartementId($departementId: ID!) {
    getAllSectionByDepartementId(departementId: $departementId) {
      yearAcademic
      System
      Niveaux
      isSpeciality
      professeur
      users
      Groups
      Schedule
      files
    }
  }
`;


export const GET_ACADIMIC_YEAR_BY_DEPARTEMENT_ID = `
  query GetAcadimicYearByDepartementId($departementId: ID!) {
    getAcadimicYearByDepartementId(departementId: $departementId) {
      startYear
      endYear
      isCurrent
      semester
    }
  }
`;


export const GET_ALL_MODULES = `
  query GetAllModules {
    getAllModules {
      name
      code
      Coef
      Credites
      files {
        name
        type
        path
      }
    }
  }
`;


export const GET_ALL_PROFESSEUR_BY_DEPARTEMENT_ID = `
  query GetAllProfeseurByDepartementId($departementId: ID!) {
    getAllProfeseurByDepartementId(departementId: $departementId) {
      dateOfBirth
      gender
      designation
      address
      profileImage
      degree
      status
      linkedIn
      researchArea
      bloodGroup
      userId
      Modules {
        name
        code
      }
      files {
        name
        type
        path
      }
    }
  }
`;


export const CREATE_GOAT_ADMIN = `
  mutation CreateGoatAdmin($input: AdminInput!) {
    createGoatAdmin(input: $input) {
      fullName
      email
      role
      isActive
    }
  }
`;



