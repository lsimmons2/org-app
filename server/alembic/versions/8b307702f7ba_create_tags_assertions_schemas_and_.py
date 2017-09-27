"""create initial tags-based db schema

Revision ID: 8b307702f7ba
Revises: 
Create Date: 2017-09-26 23:42:38.709753

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b307702f7ba'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('schemas',
    sa.Column('schema_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('time_added', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('time_updated', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=True),
    sa.PrimaryKeyConstraint('schema_id')
    )
    op.create_table('tags',
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('time_updated', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=True),
    sa.PrimaryKeyConstraint('tag_id')
    )
    op.create_table('tag_schema_correlations',
    sa.Column('tag_schema_correlation_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('schema_id', sa.Integer(), nullable=False),
    sa.Column('time_updated', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=True),
    sa.ForeignKeyConstraint(['schema_id'], ['schemas.schema_id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.tag_id'], ),
    sa.PrimaryKeyConstraint('tag_schema_correlation_id')
    )
    op.create_table('point_tag_correlations',
    sa.Column('point_tag_correlation_id', sa.Integer(), nullable=False),
    sa.Column('point_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('time_updated', sa.TIMESTAMP(), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=True),
    sa.ForeignKeyConstraint(['point_id'], ['points.point_id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.tag_id'], ),
    sa.PrimaryKeyConstraint('point_tag_correlation_id')
    )


def downgrade():
    op.drop_table('point_tag_correlations')
    op.drop_table('tag_schema_correlations')
    op.drop_table('tags')
    op.drop_table('schemas')
