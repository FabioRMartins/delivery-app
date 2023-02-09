import Header from '../../components/header/Header';
import './style.css';
import Table from '../../components/admin/usersTable';
import Form from '../../components/admin/form';

export default function AdminManage() {
  return (
    <div>
      <Header />
      <p className="admin_text">Esta é a página de administrador</p>
      <section>
        <h3>Cadastrar novo usuário</h3>
        <Form />
      </section>
      <section>
        <h3>Lista de usuários</h3>
        <Table />
      </section>
    </div>
  );
}
