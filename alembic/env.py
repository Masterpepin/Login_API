from pathlib import Path
import sys
from alembic import context
from sqlalchemy import engine_from_config, pool
from app.database import Base  # Ajusta el import según sea necesario
from app.models import User  # Importa tus modelos aquí

# Agrega el directorio del proyecto al path
sys.path.append(str(Path(__file__).resolve().parent.parent))

config = context.config

# Configurar la URL de la base de datos
config.set_main_option("sqlalchemy.url", "postgresql://postgres:password@db/postgres")

target_metadata = Base.metadata  # Asegúrate de tener tu metadata aquí

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
